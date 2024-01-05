import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafb",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 14,
    marginLeft: "6%",
  },
  inputContainer: {
    borderBottomWidth: 1, // Yalnızca alt kısmına çizgi eklemek için
    borderBottomColor: '#B0B0B0',
    marginLeft: "6%", // Çizginin sol tarafında yüzde 10 boşluk
    marginRight: "6%", // Çizginin sağ tarafında yüzde 10 boşluk
    paddingVertical: 1,
  },
  input: {
    height: 50,
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#f8fafb",
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "#4285F4",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  addHotelButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonLabel: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    marginBottom: 10,
    marginTop: 10,
    alignItems: "center",
  },
  butonContainer: {
    padding: 22,
  },
});

export default styles;
