import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafb",
  },
  roomItem: {
    padding: 16,
    margin:20,
    backgroundColor: "#fff", // Oda öğesi arkaplan rengi
    marginBottom: 16,
    borderRadius: 12,
    elevation:3.5,
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
    color: "#333333", // Açıklama rengi
  },
  roomPrice: {
    fontSize: 16,
    color: "#0F2F0F", // Fiyat rengi
  },
});

export default styles;
