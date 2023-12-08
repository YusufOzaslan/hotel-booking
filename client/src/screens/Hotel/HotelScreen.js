import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";

const HotelScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>HotelScreen</Text>
    </SafeAreaView>
  );
};
export default HotelScreen;
