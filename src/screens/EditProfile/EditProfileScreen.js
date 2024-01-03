import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import styles from "./styles";

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");

  // Kullanıcının mevcut bilgilerini getirme
  const fetchUserData = async () => {
    try {
      const userId = auth.currentUser.uid;
      const userQuery = query(
        collection(db, "users"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        // Mevcut bilgileri kullanarak giriş alanlarını doldur
        setName(userData.name);
        setSurname(userData.surname);
        setAddress(userData.address);
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Sayfa yüklendiğinde kullanıcı bilgilerini getir
  }, []); // Boş bağımlılık dizisi, sadece bir kere çalışması için

  const handleSaveChanges = async () => {
    try {
      const userId = auth.currentUser.uid;
      const userQuery = query(
        collection(db, "users"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        const updatedUser = {
          ...userData,
          name: name || userData.name,
          surname: surname || userData.surname,
          address: address || userData.address,
        };

        const userDocRef = doc(collection(db, "users"), userDoc.id);
        updateDoc(userDocRef, updatedUser);

        navigation.goBack();
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.keyboardAvoiding}>
          <Text style={styles.headerText}>Save Changes</Text>
          <TextInput
            placeholder="Ad"
            placeholderTextColor="#BEBEBE"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Soyad"
            placeholderTextColor="#BEBEBE"
            value={surname}
            onChangeText={setSurname}
            style={styles.input}
          />
          <TextInput
            placeholder="Adres"
            placeholderTextColor="#BEBEBE"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />

          <Button title="Save Changes" onPress={handleSaveChanges} color="#0F2F0F" />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
