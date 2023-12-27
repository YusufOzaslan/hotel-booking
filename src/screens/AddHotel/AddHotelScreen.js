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

const AddHotelScreen = ({ navigation }) => {
  const [hotelName, setHotelName] = useState("");
  const [city, setCity] = useState("");

  const handleAddHotel = async () => {
    const newHotel = {
      adminUserId: auth.currentUser.uid,
      name: hotelName,
      city: city,
    };

    try {
      const docRef = await addDoc(collection(db, "hotels"), newHotel);
      console.log("Document written with ID: ", docRef.id);

      navigation.goBack();
    } catch (error) {
      console.error("Error adding hotel: ", error);
    }
  };

  const handleAddRoom = () => {
    console.log("Add Room button pressed");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerText}>Add New Hotel</Text>
        <TextInput
          style={styles.input}
          placeholder="Hotel Name"
          value={hotelName}
          onChangeText={(text) => setHotelName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={(text) => setCity(text)}
        />

        <TouchableOpacity style={styles.addRoomButton} onPress={handleAddRoom}>
          <Text style={styles.addRoomButtonLabel}>Add Room</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={handleAddHotel}>
          <Text style={styles.addButtonLabel}>Add Hotel</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AddHotelScreen;
