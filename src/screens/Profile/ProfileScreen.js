import React from "react";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../../firebase";
import { signOut } from "firebase/auth";
import styles from "./styles";

const ProfileScreen = ({ navigation }) => {
  const goToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const goToBookings = () => {
    navigation.navigate("AccommodationScreen");
  };

  let logout = () => {
    signOut(auth).then(() => {
      navigation.popToTop();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Buraya profil bilgilerini göstermek için gerekli component'leri ekleyebilirsiniz */}
      <Button title="Edit Profile" onPress={goToEditProfile} />
      <Button title="Accommodation" onPress={goToBookings} />
      <Button title="Logout" onPress={logout} />
    </SafeAreaView>
  );
};

export default ProfileScreen;
