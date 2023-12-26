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
    color: "#fff", // Başlık rengi eklendi
  },
  searchBarContainer: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    borderRadius: 20,
    width: "80%",
  },
  searchBarInput: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  hotelItem: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  hotelCity: {
    fontSize: 16,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: "80%",
  },
  addButton: {
    backgroundColor: "#2F4F4F",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
  addButtonLabel: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
