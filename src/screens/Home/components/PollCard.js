import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const PollCard = ({ poll, navigation }) => {
  // Toplam oy sayısını hesapla
  const totalVotes = poll.options.reduce(
    (sum, option) =>
      sum + (option.answersByOptionId_aggregate.aggregate.count || 0),
    0
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("PollDetail", { questionId: poll.id })}
    >
      <Text style={styles.question}>{poll.question}</Text>
      <Text style={styles.optionsCount}>
        {poll.options.length} seçenek • {totalVotes} oy
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
  },
  optionsCount: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});

export default PollCard;
