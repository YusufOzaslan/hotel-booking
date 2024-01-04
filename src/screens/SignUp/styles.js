import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f8fafb",
  },
  keyboardAvoiding: {
    flex: 1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
  },
  input: {
    height: 50,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#f8fafb",
    fontSize: 18,
  },
  inputContainer: {
    borderBottomWidth: 1, // Yalnızca alt kısmına çizgi eklemek için
    borderBottomColor: '#B0B0B0',
    marginBottom: 20,
  },
  pickerInputContainer:{
    borderRadius:15,
    backgroundColor: "#ebf3f2",
    marginVertical: 10,
    justifyContent: "center",
  },
  pickerInput:{
    height: 50,
  },
  pickerItem: {
    fontSize: 18, // İstediğiniz büyüklükte ayarlayabilirsiniz
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  signUpButton:{
    backgroundColor: '#0e53b2', 
    borderColor: '#0e53b2', // Çerçeve rengi
    borderWidth: 1.2, // Çerçeve kalınlığı
    borderRadius: 20, // Kenar yuvarlaklığı
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom:15,
  },
  signUpButtonText:{
    color: '#fff', // Yazı rengi
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default styles;
