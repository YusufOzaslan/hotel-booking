import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";

const HomeScreen = (props) => {
  const { navigation } = props;
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home Screen</Text>
      {/* Home içeriği buraya eklenebilir */}
    </SafeAreaView>
  );
};

export default HomeScreen;
