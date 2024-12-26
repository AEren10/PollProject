import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export const AddOptionButton = ({ onPress, disabled }) => (
  <TouchableOpacity
    style={styles.addButton}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.addButtonText}>+ Yeni Seçenek</Text>
  </TouchableOpacity>
);

export const SubmitButton = ({ onPress, disabled, loading }) => (
  <TouchableOpacity
    style={[styles.submitButton, disabled && styles.submitButtonDisabled]}
    onPress={onPress}
    disabled={disabled}
  >
    {loading ? (
      <ActivityIndicator color="white" size="small" />
    ) : (
      <Text style={styles.submitButtonText}>Anketi Oluştur</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  addButton: {
    alignItems: "center",
    padding: 12,
    marginTop: 5,
    marginBottom: 15,
  },
  addButtonText: {
    color: "#0066cc",
    fontSize: 16,
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#0066cc",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
