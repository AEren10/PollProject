import { View, Text, StyleSheet } from "react-native";
import { useSubscription } from "@apollo/client";
import { GET_QUESTION_DETAIL } from "./queries/PollDetailQueries";
import OptionsList from "./components/OptionsList";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const PollDetailScreen = ({ route }) => {
  const { questionId } = route.params;

  const { data, loading, error } = useSubscription(GET_QUESTION_DETAIL, {
    variables: { id: questionId },
  });

  if (loading) return <Loading />;
  if (error) return <Error message="Soru detayı yüklenirken bir hata oluştu" />;

  const question = data.questions_by_pk;

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.text}</Text>
      <OptionsList options={question.options} questionId={questionId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default PollDetailScreen;
