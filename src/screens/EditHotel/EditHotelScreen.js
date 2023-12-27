import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import styles from "./styles";

const EditHotelScreen = ({ navigation, route }) => {
  const { hotelId, hotelName } = route.params || {
    hotelId: null,
    hotelName: "Hotel",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoading(true);

        // Firebase'den odaları al
        const roomsQuery = query(
          collection(db, "rooms"),
          where("hotel-Id", "==", hotelId)
        );

        const querySnapshot = await getDocs(roomsQuery);

        const roomList = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          roomList.push({
            id: doc.id,
            description: data.description,
            price: data.price,
            // Diğer oda özelliklerini ekleyebilirsiniz
          });
        });

        setRooms(roomList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setIsLoading(false);
      }
    };

    if (hotelId) {
      fetchRooms();
    }
  }, [hotelId]);

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

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={rooms}
          renderItem={({ item }) => (
            <View style={styles.roomItem}>
              <Text style={styles.roomDescription}>{item.description}</Text>
              <Text style={styles.roomPrice}>Price: {item.price}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};
export default EditHotelScreen;
