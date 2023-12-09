import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";

const EditProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>edit profile</Text>
    </SafeAreaView>
  );
};
export default EditProfileScreen;
