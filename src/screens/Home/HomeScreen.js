import { View, StyleSheet, Text } from "react-native";
import { useSubscription } from "@apollo/client";
import { GET_QUESTIONS_SUBSCRIPTION } from "./queries/HomeQueries";
import PollList from "./components/PollList";
import Loading from "../../components/Loading";
import LottieView from "lottie-react-native";

const HomeScreen = () => {
  const { data, loading } = useSubscription(GET_QUESTIONS_SUBSCRIPTION);

  if (loading) return <Loading />;

  if (!data?.questions?.length) {
    return (
      <View style={styles.emptyContainer}>
        <LottieView
          source={require("../../assets/animations/empty-box.json")}
          autoPlay
          loop
          style={styles.emptyAnimation}
        />
        <Text style={styles.emptyText}>Henüz hiç anket yok</Text>
      </View>
    );
  }

  const polls = data.questions.map((question) => ({
    id: question.id,
    question: question.text,
    options: question.options,
  }));

  return (
    <View style={styles.container}>
      <PollList polls={polls} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  emptyAnimation: {
    width: 400,
    height: 400,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default HomeScreen;
