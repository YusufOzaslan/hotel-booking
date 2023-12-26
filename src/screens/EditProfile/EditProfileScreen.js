import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import styles from "./styles";

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");

  const handleSaveChanges = async () => {
    try {
      const userId = auth.currentUser.uid;
      const userQuery = query(
        collection(db, "users"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        // Sadece ilk belgeyi al
        const userDoc = querySnapshot.docs[0];

        // Mevcut belge verilerini al
        const userData = userDoc.data();

        // Güncellenmiş verileri belgeye ekle
        const updatedUser = {
          ...userData,
          name: name || userData.name, // Eğer yeni bir değer girilmediyse mevcut değeri kullan
          surname: surname || userData.surname,
          address: address || userData.address,
        };

        // Kullanıcı belgesini güncelle
        const userDocRef = doc(collection(db, "users"), userDoc.id);
        updateDoc(userDocRef, updatedUser);

        // Opsiyonel: İşlem tamamlandıktan sonra başka bir ekrana yönlendirme
        navigation.goBack();
      } else {
        // Kullanıcı bulunamadı, gerekirse bir işlem yapabilirsiniz
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
