import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../../firebase";
import styles from "./styles";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home Screen</Text>
      {/* Home içeriği buraya eklenebilir */}
    </SafeAreaView>
  );
};

export default HomeScreen;
