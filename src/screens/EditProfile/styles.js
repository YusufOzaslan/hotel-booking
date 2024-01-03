import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafb",
  },
  keyboardAvoiding:{
    flex: 1,
    justifyContent: 'center',
    margin: 10,
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
  },
  input: {
    backgroundColor: "#333333",
    borderColor: "#333333",
    borderWidth: 8,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: "#fff",
    fontSize: 18,
  },
  buttonContainer:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#0e53b2",
    marginBottom: 20,
    width: 175,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    color: "#0e53b2",
    borderRadius: 17,
  },
  buttonText: {
    fontSize:20,
    color: "#fff",
  },
});
export default styles;
