// EditRoomScreen.js

import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "./styles";

const EditRoomScreen = ({ navigation, route }) => {
  const { roomId, hotelId } = route.params || { roomId: null };
  const [roomData, setRoomData] = useState({
    hotelId: hotelId,
    description: "",
    price: "",
    roomName: "",
    // Diğer oda özellikleri eklenebilir
  });

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomDoc = await getDoc(doc(db, "rooms", roomId));
        if (roomDoc.exists()) {
          setRoomData(roomDoc.data());
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    if (roomId) {
      fetchRoomData();
    }
  }, [roomId]);

  const handleSaveChanges = async () => {
    try {
      // Firestore'da oda verilerini güncelle
      await updateDoc(doc(db, "rooms", roomId), roomData);

      // Kullanıcıyı bilgilendir
      alert("Room data updated successfully!");

      // Geri dön
      navigation.goBack();
    } catch (error) {
      console.error("Error updating room data:", error);
      alert("Failed to update room data.");
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Edit Room",
      headerStyle: {
        backgroundColor: "#2F4F4F",
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerRight: () => (
        <TouchableOpacity onPress={handleSaveChanges}>
          <Text style={styles.saveButtonLabel}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleSaveChanges]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Room Name"
        value={roomData.roomName}
        onChangeText={(text) => setRoomData({ ...roomData, roomName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Room Description"
        value={roomData.description}
        onChangeText={(text) => setRoomData({ ...roomData, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={roomData.price}
        onChangeText={(text) => setRoomData({ ...roomData, price: text })}
        keyboardType="numeric"
      />
      {/* Diğer oda özelliklerini ekleyebilirsiniz */}
    </SafeAreaView>
  );
};

export default EditRoomScreen;
