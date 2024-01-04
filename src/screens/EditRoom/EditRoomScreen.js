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
        backgroundColor: "#0e53b2",
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerTitleStyle: {
        fontSize: 28, // İstediğiniz büyüklükte bir değer
        color: "#fff", // Başlığın rengi
        fontWeight: 500, // Kalınlık (normal, bold, etc.)
        marginLeft: 5, // Başlığı sağa kaydır
      },
    });
  }, [navigation, handleSaveChanges]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.roomContainer}>
        
        <View style={styles.roomTitle}>
          <Text style={styles.titleText}>Update room information</Text>
          <TouchableOpacity onPress={handleSaveChanges}>
            <Text style={styles.saveButtonLabel}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.textInput}>Room Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Room Name"
            value={roomData.roomName}
            onChangeText={(text) => setRoomData({ ...roomData, roomName: text })}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.rowContainer}>
          <Text style={styles.textInput}>Room Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Room Description"
            value={roomData.description}
            onChangeText={(text) => setRoomData({ ...roomData, description: text })}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.rowContainer}>
          <Text style={styles.textInput}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={roomData.price}
            onChangeText={(text) => setRoomData({ ...roomData, price: text })}
            keyboardType="numeric"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditRoomScreen;
