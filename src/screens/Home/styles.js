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
    // Otellerin listelendiği öğelerin stili
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
});
export default styles;
