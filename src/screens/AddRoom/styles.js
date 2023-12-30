import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333333",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFFFFF",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  addButton: {
    backgroundColor: "#4285F4",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  imageContaoner: {
    marginBottom: 50,
    marginTop: 30,
    alignItems: "center",
  },
});

export default styles;
