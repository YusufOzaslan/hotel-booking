import React from "react";
import {
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../../firebase";
import styles from "./styles";

const SignUp = ({ navigation }) => {
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [validationMessage, setValidationMessage] = React.useState("");

  let signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //sendEmailVerification(auth.currentUser);
        //navigation.navigate("HomeScreen", { user: userCredential.user });
        navigation.navigate("Inside");
      })
      .catch((error) => {
        setValidationMessage(error.message);
        alert(validationMessage);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.keyboardAvoiding}>
          <Text style={styles.headerText}>Sign Up</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#BEBEBE"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#BEBEBE"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <Button title="Sign Up" onPress={signUp} color="#0F2F0F" />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignUp;
