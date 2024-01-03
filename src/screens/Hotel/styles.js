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
    marginBottom: 16,
    borderRadius: 8,
  },
  roomImage: {
    width: "100%",
    height: 200,
    marginBottom: 8,
    borderRadius: 8, // İsteğe bağlı: Köşeleri yuvarlatmak için
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
