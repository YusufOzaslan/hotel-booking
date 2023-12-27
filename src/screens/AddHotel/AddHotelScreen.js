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
import { addDoc, collection, getDoc } from "firebase/firestore";
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
      // Yeni belgeyi ekleyin
      const docRef = await addDoc(collection(db, "hotels"), newHotel);
      console.log("Document written with ID: ", docRef.id);
    
      // Eklenen belgeyi okuyun
      const addedDoc = await getDoc(docRef);
      const addedData = addedDoc.data();
    
      // İlgili bilgileri kullanarak başka bir ekrana geçiş yapın
      navigation.navigate("EditHotelScreen", { hotelId: docRef.id, hotelName: addedData.name });
    } catch (error) {
      console.error("Error adding hotel: ", error);
    }
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
        <TouchableOpacity style={styles.addButton} onPress={handleAddHotel}>
          <Text style={styles.addButtonLabel}>Add Hotel</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AddHotelScreen;
