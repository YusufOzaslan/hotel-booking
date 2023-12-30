// newStyles.js

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
  searchBarContainer: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginVertical: 10,
    borderRadius: 20,
    width: "80%",
  },
  searchBarInput: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  hotelItem: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
  },
  hotelPhoto: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2F4F4F",
    marginBottom: 8,
  },
  hotelCity: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 8,
  },
});

export default styles;
