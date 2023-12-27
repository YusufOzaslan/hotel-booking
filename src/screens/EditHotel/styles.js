import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333333",
  },
  roomItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  roomDescription: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#FFFFFF",
  },
  roomPrice: {
    fontSize: 16,
    color: "#CCCCCC",
  },
  deleteRoomButton: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    alignItems: "center",
  },
  deleteRoomButtonLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  editRoomButton: {
    backgroundColor: "#4285F4", // Örnek renk, istediğiniz renge değiştirebilirsiniz
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    alignItems: "center",
  },
  editRoomButtonLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  addRoomButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  addRoomButtonLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
