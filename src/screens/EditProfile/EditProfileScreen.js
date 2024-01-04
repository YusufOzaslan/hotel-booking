import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, Text, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View } from "react-native";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import styles from "./styles";

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState("name");
  const [surname, setSurname] = useState("surname");
  const [address, setAddress] = useState("address");

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
          <Text style={styles.headerText}>My Membership Information</Text>
          <TextInput
            placeholder="Ad"
            placeholderTextColor="#C0C0C0"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Soyad"
            placeholderTextColor="#C0C0C0"
            value={surname}
            onChangeText={setSurname}
            style={styles.input}
          />
          <TextInput
            placeholder="Adres"
            placeholderTextColor="#C0C0C0"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSaveChanges} style={styles.button}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
