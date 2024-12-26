import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const PollForm = ({
  question,
  setQuestion,
  options,
  onOptionChange,
  onOptionRemove,
}) => {
  return (
    <View>
      <TextInput
        style={styles.questionInput}
        placeholder="Soru başlığını girin..."
        value={question}
        onChangeText={setQuestion}
      />

      {options.map((option, index) => (
        <View key={index} style={styles.optionContainer}>
          <TextInput
            style={styles.optionInput}
            placeholder={`${index + 1}. seçenek`}
            value={option}
            onChangeText={(text) => onOptionChange(text, index)}
          />
          {index >= 2 && ( // İlk 2 şık silinemez
            <TouchableOpacity
              onPress={() => onOptionRemove(index)}
              style={styles.removeButton}
            >
              <Icon name="trash-outline" size={20} color="#ff4444" />
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  questionInput: {
    borderWidth: 1.5,
    borderColor: "#0066cc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    height: 50,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  optionInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  removeButton: {
    padding: 10,
    marginLeft: 10,
  },
});

export default PollForm;
