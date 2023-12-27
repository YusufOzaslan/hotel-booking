import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import styles from "./styles";

const AccommodationScreen = ({ navigation }) => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // Kullanıcının UID'sini kullanarak rezervasyonları sorgula
        const reservationsQuery = query(
          collection(db, "bookings"),
          where("userId", "==", auth.currentUser.uid)
        );

        const querySnapshot = await getDocs(reservationsQuery);

        const reservationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReservations(reservationsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={reservations}
          renderItem={({ item }) => (
            <View style={styles.reservationItem}>
              <Text>Hotel: {item.hotelName}</Text>
              <Text>Room: {item.roomName}</Text>
              <Text>Date: {item.date}</Text>
              {/* Diğer bilgileri de buraya ekleyebilirsiniz */}
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default AccommodationScreen;
