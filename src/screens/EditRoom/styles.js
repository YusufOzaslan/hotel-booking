import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafb",
    padding: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#B0B0B0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    padding: 8,
    fontSize: 17,
  },
  saveButtonLabel: {
    color: "#fff",
    fontSize: 19,
    marginRight: 20,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    paddingLeft: 35,
    paddingRight: 35,
  },
  roomContainer:{
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
  },
  textInput: {
    marginRight: 5,
    width: "35%",
    fontSize:18,
  },
  titleText:{
    padding: 10,
    fontSize: 22,
    fontWeight: 'bold',
    borderColor: "#333333",
  },
  roomTitle:{
    alignItems: 'center',
    justifyContent: "space-between",
    backgroundColor: "#ebf3f2",
    borderRadius: 8,
    padding: 5,
    flexDirection: "row",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e6eaed", 
    marginLeft: "5%", // Çizginin sol tarafında yüzde 10 boşluk
    marginRight: "5%", // Çizginin sağ tarafında yüzde 10 boşluk
  },
});

export default styles;
