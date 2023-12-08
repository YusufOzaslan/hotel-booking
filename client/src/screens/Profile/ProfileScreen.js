import React from "react";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";

const ProfileScreen = ({ navigation }) => {
  const goToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const goToReservations = () => {
    navigation.navigate("Reservations");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Buraya profil bilgilerini göstermek için gerekli component'leri ekleyebilirsiniz */}
      <Button title="Edit Profile" onPress={goToEditProfile} />
      <Button title="View Reservations" onPress={goToReservations} />
    </SafeAreaView>
  );
};

export default ProfileScreen;
