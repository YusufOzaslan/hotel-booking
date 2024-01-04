import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f8fafb",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchBarContainer: {
    backgroundColor: "#ebf3f2",
    padding: 10,
    marginVertical: 10,
    borderRadius: 20,
    width: "80%",
  },
  searchBarInput: {
    backgroundColor: "#ebf3f2",
    paddingHorizontal: 20,
  },
  hotelItem: {
    padding: 20,
    marginVertical: 8,
    width: '100%',
    backgroundColor: "#ebf3f2",
    borderRadius: 15,
    elevation: 3,
  },
  hotelName: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: "bold",
  },
  hotelCity: {
    marginTop: 5,
    fontSize: 18,
  },
  flatListContainer: {
    width: '80%',
  },
  hotelPhoto: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  }
});
export default styles;
