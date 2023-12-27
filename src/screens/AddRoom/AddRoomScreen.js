import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import styles from "./styles";

const AddRoomScreen = ({ navigation, route }) => {
  const { hotelId } = route.params;
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleAddRoom = async () => {
    const newRoom = {
      hotelId: hotelId,
      roomName: roomName,
      description: description,
      price: price,
    };

    try {
      await addDoc(collection(db, "rooms"), newRoom);
      navigation.goBack();
    } catch (error) {
      console.error("Error adding room: ", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerText}>Add New Room</Text>
        <TextInput
          style={styles.input}
          placeholder="Room Name"
          value={roomName}
          onChangeText={(text) => setRoomName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Room Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={(text) => setPrice(text)}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddRoom}>
          <Text style={styles.addButtonLabel}>Add Room</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AddRoomScreen;
