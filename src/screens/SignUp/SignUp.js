import React from "react";
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import styles from "./styles";

const SignUp = ({ navigation }) => {
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [role, setRole] = React.useState("guest");

  let signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        //sendEmailVerification(auth.currentUser);
        //navigation.navigate("HomeScreen", { user: userCredential.user });
        await addDoc(collection(db, "users"), {
          userId: userCredential.user.uid,
          role: role,
        });
        navigation.navigate("Inside");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.keyboardAvoiding}>
          <Text style={styles.headerText}>Sign Up</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#BEBEBE"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#BEBEBE"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
          </View>
          <View style={styles.pickerInputContainer}>
            <Picker
              selectedValue={role}
              onValueChange={(itemValue) => setRole(itemValue)}
              style={styles.pickerInput}
            >
              <Picker.Item key="guest" label="Guest" value="guest" style={styles.pickerItem}/>
              <Picker.Item key="hotelOwner" label="Hotel Owner" value="hotelOwner" style={styles.pickerItem}/>
            </Picker>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={signUp} style={styles.signUpButton}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignUp;
