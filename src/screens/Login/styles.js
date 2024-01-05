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
  helloTitle: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },
  title: {
    fontSize: 25,
    color: "#333333",
    marginBottom: 20,
    textAlign: "center",
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
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  loginButton:{
    backgroundColor: '#0e53b2', 
    borderColor: '#0e53b2', // Çerçeve rengi
    borderWidth: 1.2, // Çerçeve kalınlığı
    borderRadius: 20, // Kenar yuvarlaklığı
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom:15,
  },
  loginButtonText:{
    color: '#fff', // Yazı rengi
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  signUpButton:{
    backgroundColor: 'white',
    borderColor: '#0e53b2', // Çerçeve rengi
    borderWidth: 1.2, // Çerçeve kalınlığı
    borderRadius: 20, // Kenar yuvarlaklığı
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  signUpButtonText:{
    color: '#0e53b2', // Yazı rengi
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  separator: {
    height: 10,
  },
});

export default styles;
