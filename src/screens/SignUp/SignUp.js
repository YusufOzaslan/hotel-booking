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
import { Picker } from "@react-native-picker/picker";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import styles from "./styles";

const SignUp = ({ navigation }) => {
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [validationMessage, setValidationMessage] = React.useState("");
  let [role, setRole] = React.useState("guest");

  let signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        //sendEmailVerification(auth.currentUser);
        //navigation.navigate("HomeScreen", { user: userCredential.user });
        await addDoc(collection(db, "hotel-booking-app"), {
          userId: userCredential.user.uid,
          role: role,
        });
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
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Guest" value="guest" />
            <Picker.Item label="Hotel Owner" value="hotelOwner" />
          </Picker>
          <Button title="Sign Up" onPress={signUp} color="#0F2F0F" />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignUp;
