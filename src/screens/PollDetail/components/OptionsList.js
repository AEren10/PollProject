import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { VOTE_ON_OPTION } from "../queries/PollDetailQueries";
import Option from "./Option";

const OptionsList = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [voteOnOption] = useMutation(VOTE_ON_OPTION);

  const totalVotes = options.reduce(
    (sum, option) =>
      sum + (option.answersByOptionId_aggregate.aggregate.count || 0),
    0
  );

  const handleVote = async (optionId) => {
    if (!hasVoted) {
      try {
        setSelectedOption(optionId);
        setIsVoting(true);

        //  const startTime = performance.now(); // Başlangıç zamanı (milisaniye)

        await voteOnOption({ variables: { optionId } });

        //  const endTime = performance.now(); // Bitiş zamanı
        //  console.log(`Oy verme süresi: ${endTime - startTime}ms`); // Geçen süre

        setHasVoted(true);
      } catch (error) {
        console.error("Oy verme hatası:", error);
        setSelectedOption(null);
      } finally {
        setIsVoting(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const voteCount =
          option.answersByOptionId_aggregate.aggregate.count || 0;
        const votePercentage = totalVotes > 0 ? voteCount / totalVotes : 0;

        return (
          <Option
            key={option.id}
            option={option}
            isSelected={selectedOption === option.id}
            hasVoted={hasVoted}
            voteCount={voteCount}
            votePercentage={votePercentage}
            isLoading={isVoting && selectedOption === option.id}
            onPress={() => {
              setSelectedOption(option.id);
              handleVote(option.id);
            }}
          />
        );
      })}
      {hasVoted && (
        <Text style={styles.totalVotes}>Toplam {totalVotes} oy</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  totalVotes: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
    fontSize: 14,
  },
});

export default OptionsList;
