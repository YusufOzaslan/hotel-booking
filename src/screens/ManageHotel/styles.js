import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  addButton: {
    backgroundColor: "#0e53b2",
    padding: 15,
    borderRadius: 8,
    margin: 16,
    alignItems: "center",
  },
  addButtonLabel: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
  },
  hotelItemContainer: {
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    elevation: 3,
  },
  hotelItem: {
    padding: 16,
  },
  hotelPhoto: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  hotelCity: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  editButtonText: {
    color: "#FFFFFF",
  },
  deleteButton: {
    backgroundColor: "#FF5733",
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "#FFFFFF",
  },
  guestsButton: {
    backgroundColor: "#3498db",
    padding: 8,
    borderRadius: 4,
  },
  guestsButtonText: {
    color: "#FFFFFF",
  },
});

export default styles;
