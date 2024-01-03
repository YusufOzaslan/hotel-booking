import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../../firebase";
import styles from "./styles";

const EditHotelScreen = ({ navigation, route }) => {
  const { hotelId, hotelName } = route.params || {
    hotelId: null,
    hotelName: "Hotel",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (hotelId) {
      fetchRooms();
    }
  }, [hotelId]);
  const fetchRooms = async () => {
    try {
      setIsLoading(true);

      // Firebase'den odaları al
      const roomsQuery = query(
        collection(db, "rooms"),
        where("hotelId", "==", hotelId)
      );

      const querySnapshot = await getDocs(roomsQuery);

      const roomList = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const imageRef = ref(storage, data.imageUrl);

          try {
            const imageURL = await getDownloadURL(imageRef);
            return {
              id: doc.id,
              description: data.description,
              price: data.price,
              roomName: data.roomName,
              image: imageURL,
            };
          } catch (error) {
            console.log("Error fetching image: ", error);
            return null; // Eğer resim alınamazsa null döndür
          }
        })
      );

      setRooms(roomList);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setIsLoading(false);
    } finally {
      setRefreshing(false);
    }
  };
  const handleAddRoom = () => {
    navigation.navigate("AddRoomScreen", { hotelId: hotelId });
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      // Firestore'dan odayı sil
      await deleteDoc(doc(db, "rooms", roomId));

      // Odaları güncelle
      const updatedRooms = rooms.filter((room) => room.id !== roomId);
      setRooms(updatedRooms);

      // Kullanıcıyı bilgilendir
      Alert.alert("Success", "Room deleted successfully!");
    } catch (error) {
      console.error("Error deleting room:", error);
      Alert.alert("Error", "Failed to delete room.");
    }
  };

  const handleEditRoom = (roomId) => {
    // EditProfileScreen sayfasına yönlendir
    navigation.navigate("EditRoomScreen", { roomId: roomId, hotelId: hotelId });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Manage " + hotelName,
      headerStyle: {
        backgroundColor: "#2F4F4F",
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  }, [navigation, hotelName]);
  const onRefresh = () => {
    setRefreshing(true);
    fetchRooms();
  };
  const renderRoomItem = ({ item }) => (
    <View style={styles.roomItemContainer}>
      <View style={styles.roomItem}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.roomPhoto} />
        ) : (
          <Text>Loading...</Text>
        )}
        <Text style={styles.roomName}>{item.roomName}</Text>
        <Text style={styles.roomDescription}>{item.description}</Text>
        <Text style={styles.roomPrice}>{`Price: ${item.price}`}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEditRoom(item.id)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteRoom(item.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddRoom}>
        <Text style={styles.addButtonLabel}>Add Room</Text>
      </TouchableOpacity>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={rooms}
          renderItem={renderRoomItem}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default EditHotelScreen;
