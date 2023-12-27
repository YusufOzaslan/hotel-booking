import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import styles from "./styles";

const ManageHotelScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchHotels();
  }, [refreshing]); // Eğer sadece refreshing durumu değiştiğinde çalışmasını istiyorsanız buraya ekleyebilirsiniz

  const fetchHotels = async () => {
    try {
      setIsLoading(true);
      const userId = auth.currentUser.uid;
      const userQuery = query(
        collection(db, "hotels"),
        where("adminUserId", "==", userId)
      );
      const querySnapshot = await getDocs(userQuery);
      const hotelList = [];

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          hotelList.push({
            id: doc.id,
            name: data.name,
            city: data.city,
          });
        });

        setHotels(hotelList);
        setIsLoading(false);
      } else {
        setHotels([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setIsLoading(false);
    } finally {
      setRefreshing(false);
    }
  };

  const handleHotelPress = (hotelName, hotelId) => {
    navigation.navigate("EditHotelScreen", { hotelName, hotelId });
  };

  const renderHotelItem = ({ item }) => (
    <TouchableOpacity
      style={styles.hotelItem}
      onPress={() => handleHotelPress(item.name, item.id)}
    >
      <Text style={styles.hotelName}>{item.name}</Text>
      <Text style={styles.hotelCity}>{item.city}</Text>
    </TouchableOpacity>
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
