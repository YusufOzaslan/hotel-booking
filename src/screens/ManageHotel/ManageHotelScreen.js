import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";

const ManageHotelScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Manage Screen</Text>
      {/* Profil içeriği buraya eklenebilir */}
    </SafeAreaView>
  );
};

export default ManageHotelScreen;
