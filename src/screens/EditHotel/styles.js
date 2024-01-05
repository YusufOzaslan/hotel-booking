import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f8fafb",
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
    height: 220,
    resizeMode: "cover",
    marginBottom: 10,
  },
  roomName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  roomDescription: {
    fontSize: 16,
    color: "#0F2F0F",
    paddingVertical: 8,
  },
  roomPrice: {
    fontSize: 16,
    color: "#0F2F0F",
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
    width: 90,
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
    width: 90,
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  addButtonContainer: {
    alignItems: "center",
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
