import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
  },
  roomItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    backgroundColor: "#444444", // Oda öğesi arkaplan rengi
  },
  roomDescription: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#FFFFFF", // Açıklama rengi
  },
  roomPrice: {
    fontSize: 16,
    color: "#CCCCCC", // Fiyat rengi
  },
});

export default styles;
