import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333333",
  },
  roomItemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  roomItem: {
    flexDirection: "column",
  },
  roomPhoto: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  roomName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  roomDescription: {
    fontSize: 16,
    color: "#CCCCCC",
  },
  roomPrice: {
    fontSize: 16,
    color: "#CCCCCC",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#4285F4",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    alignItems: "center",
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    marginLeft: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  addButtonLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
