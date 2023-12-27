// styles.js

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333", // Light background color
    padding: 20,
  },
  keyboardAvoiding: {
    flex: 1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333", // Dark text color
  },
  input: {
    height: 40,
    borderColor: "#C0C0C0", // Light border color
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: "#333333", // Dark text color
  },
  // Additional styles can be added here
});

export default styles;
