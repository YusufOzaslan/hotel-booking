import {
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "./styles";
import { auth } from "../../../firebase";

const LoginScreen = ({ navigation }) => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [errorMessage, setErrorMessage] = useState("error");

  const signIn = async () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          //navigation.navigate("Inside", { user: userCredential.user });
          navigation.navigate("Inside");
          setErrorMessage("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          setErrorMessage(error.message);
          alert(errorMessage);
        });
    } else {
      setErrorMessage("Please enter an email and password");
      alert(errorMessage);
    }
  };
  const signUp = async () => {
    navigation.navigate("SignUp");
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.keyboardAvoiding}>
          <Text style={styles.helloTitle}>Hello!</Text>
          <Text style={styles.title}>Sign in to your account</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={email}
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              secureTextEntry={true}
              value={password}
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={signIn} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
        
              <View style={styles.separator} />
              <TouchableOpacity onPress={signUp} style={styles.signUpButton}>
                <Text style={styles.signUpButtonText}>SignUp</Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LoginScreen;
