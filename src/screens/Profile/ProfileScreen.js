import React, { useLayoutEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../../firebase";
import { signOut } from "firebase/auth";
import styles from "./styles";

const ProfileScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => null,
      title: "My Profile",
      headerStyle: {
        backgroundColor: "#0e53b2",
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerTitleStyle: {
        fontSize: 28, // İstediğiniz büyüklükte bir değer
        color: "#fff", // Başlığın rengi
        fontWeight: 500, // Kalınlık (normal, bold, etc.)
        marginLeft: 25, // Başlığı sağa kaydır
      },
    });
  });
  const goToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const goToBookings = () => {
    navigation.navigate("BookingsScreen");
  };

  const logout = () => {
    signOut(auth).then(() => {
      navigation.popToTop();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={goToEditProfile}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={goToBookings}>
          <Text style={styles.buttonText}>Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
