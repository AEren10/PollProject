import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import ProgressBar from "./ProgressBar";

const Option = ({
  option,
  isSelected,
  hasVoted,
  voteCount,
  votePercentage,
  isLoading,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.option, isSelected && !hasVoted && styles.selectedOption]}
      onPress={onPress}
      disabled={hasVoted || isLoading}
    >
      <View style={styles.optionContent}>
        <View style={styles.radioContainer}>
          {!hasVoted && (
            <View style={styles.radioOuter}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#0066cc" />
              ) : (
                <View
                  style={[
                    styles.radioInner,
                    isSelected && styles.radioInnerSelected,
                  ]}
                />
              )}
            </View>
          )}
          <Text style={[styles.optionText, hasVoted && styles.votedOptionText]}>
            {option.text}
          </Text>
        </View>
        {hasVoted && (
          <Text style={styles.voteCount}>
            {voteCount} oy ({Math.round(votePercentage * 100)}%)
          </Text>
        )}
      </View>
      {hasVoted && <ProgressBar percentage={votePercentage} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    marginVertical: 5,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    overflow: "hidden",
  },
  selectedOption: {
    backgroundColor: "#e3efff",
  },
  optionContent: {
    padding: 15,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#0066cc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "transparent",
  },
  radioInnerSelected: {
    backgroundColor: "#0066cc",
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  voteCount: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  votedOptionText: {
    marginLeft: 0,
  },
});

export default Option;
