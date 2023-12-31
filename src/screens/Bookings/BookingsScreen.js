import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
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
import { db, auth } from "../../../firebase";
import styles from "./styles";

const BookingsScreen = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservationsQuery = query(
          collection(db, "bookings"),
          where("userId", "==", auth.currentUser.uid)
        );

        const querySnapshot = await getDocs(reservationsQuery);

        const reservationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookings(reservationsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleDeleteReservation = async (id) => {
    try {
      const bookingRef = doc(db, "bookings", id);
      await deleteDoc(bookingRef);
      Alert.alert("Success", "Booking deleted successfully!");
      setBookings((prevReservations) =>
        prevReservations.filter((reservation) => reservation.id !== id)
      );
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={bookings}
          renderItem={({ item }) => (
            <View style={styles.reservationItem}>
            <Text style={styles.titleText}>Hotel: {item.hotelName}</Text>
            <Text style={styles.infoText}>Room: {item.roomName}</Text>
            <Text style={styles.infoText}>Check-in date: {item.startDate}</Text>
            <Text style={styles.infoText}>check-out date: {item.endDate}</Text>
            <Text style={styles.infoText}>Customer name: {item.name}</Text>
            <Text style={styles.infoText}>Customer last name: {item.lastName}</Text>
            <Text style={styles.infoText}>Phone Number: {item.phoneNumber}</Text>
              <View style={styles.deleteButtonContainer}>
                <TouchableOpacity
                  onPress={() => handleDeleteReservation(item.id)}
                >
                  <Text style={styles.deleteButton}>Delete Reservation</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default BookingsScreen;
