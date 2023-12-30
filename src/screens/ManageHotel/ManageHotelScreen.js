import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Image,
  Alert,
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

const ManageHotelScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchHotels();
  }, [refreshing]);

  const fetchHotels = async () => {
    try {
      setIsLoading(true);
      const userId = auth.currentUser.uid;
      const userQuery = query(
        collection(db, "hotels"),
        where("adminUserId", "==", userId)
      );
      const querySnapshot = await getDocs(userQuery);

      const hotelList = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const imageRef = ref(storage, data.imageURL);

          try {
            const imageURL = await getDownloadURL(imageRef);
            return {
              id: doc.id,
              name: data.name,
              city: data.city,
              image: imageURL,
            };
          } catch (error) {
            console.log("Error fetching image: ", error);
            return null; // Eğer resim alınamazsa null döndür
          }
        })
      );

      setHotels(hotelList);
    } catch (error) {
      console.error("Otel bilgileri getirme hatası:", error);
    } finally {
      setRefreshing(false);
      setIsLoading(false);
    }
  };
  const handleDeleteHotel = async (hotelId) => {
    try {
      const hotelRef = doc(db, "hotels", hotelId);
      await deleteDoc(hotelRef);
      Alert.alert("Success", "Hotel deleted successfully!");
      fetchHotels(); // Otelleri güncellemek için fetchHotels'i çağırın
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  const handleEditHotel = (hotelId, hotelName) => {
    navigation.navigate("EditHotelScreen", { hotelId, hotelName });
  };

  const handleGuests = (hotelId) => {
    navigation.navigate("GuestsScreen", { hotelId });
  };

  const renderHotelItem = ({ item }) => (
    <View style={styles.hotelItemContainer}>
      <View style={styles.hotelItem}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.hotelPhoto} />
        ) : (
          <Text>Loading...</Text>
        )}
        <Text style={styles.hotelName}>{item.name}</Text>
        <Text style={styles.hotelCity}>{item.city}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEditHotel(item.id, item.name)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.guestsButton}
            onPress={() => handleGuests(item.id)}
          >
            <Text style={styles.deleteButtonText}>My Guests</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteHotel(item.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const handleAddHotel = () => {
    navigation.navigate("AddHotelScreen");
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchHotels();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => null,
      title: "My Hotel",
      headerStyle: {
        backgroundColor: "#2F4F4F",
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddHotel}>
        <Text style={styles.addButtonLabel}>Add Hotel</Text>
      </TouchableOpacity>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={hotels}
          renderItem={renderHotelItem}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default ManageHotelScreen;
