import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Modal,
} from "react-native";
import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { ADD_QUESTION } from "./queries/CreatePollQueries";
import PollForm from "./components/PollForm";
import { AddOptionButton, SubmitButton } from "./components/FormButtons";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

const CreatePollScreen = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [addQuestion] = useMutation(ADD_QUESTION);
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const animationRef = useRef(null);

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, ""]);
    }
  };

  const handleOptionChange = (text, index) => {
    const newOptions = [...options];
    newOptions[index] = text;
    setOptions(newOptions);
  };

  const handleOptionRemove = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await addQuestion({
        variables: {
          text: question,
          options: options.map((text) => ({ text })),
        },
      });
      setQuestion("");
      setOptions(["", ""]);

      setShowSuccess(true);
      if (animationRef.current) {
        animationRef.current.reset();
        animationRef.current.play();
      }

      setTimeout(() => {
        setShowSuccess(false);
        navigation.goBack();
      }, 2800);
    } catch (error) {
      console.error("Soru ekleme hatası:", error);
      Alert.alert("Hata", "Anket oluşturulurken bir hata oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled =
    !question.trim() || options.some((opt) => !opt.trim());

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Yeni Anket Ekle</Text>
          <View style={styles.divider} />

          <PollForm
            question={question}
            setQuestion={setQuestion}
            options={options}
            onOptionChange={handleOptionChange}
            onOptionRemove={handleOptionRemove}
          />

          {options.length < 5 && (
            <AddOptionButton
              onPress={handleAddOption}
              disabled={options.length >= 5}
            />
          )}
          <SubmitButton
            onPress={handleSubmit}
            disabled={isSubmitDisabled || isSubmitting}
            loading={isSubmitting}
          />
        </View>
      </TouchableWithoutFeedback>

      <Modal visible={showSuccess} transparent>
        <View style={styles.successModal}>
          <LottieView
            ref={animationRef}
            source={require("../../assets/animations/success.json")}
            autoPlay
            loop={false}
            speed={0.8}
            style={styles.successAnimation}
            onAnimationFinish={() => {
              console.log("Animation finished");
            }}
            renderMode="HARDWARE"
            cacheComposition={true}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginTop: 10,
    marginBottom: 20,
  },
  successModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  successAnimation: {
    width: 100,
    height: 100,
  },
});

export default CreatePollScreen;
