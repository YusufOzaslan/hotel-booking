import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Button,
  ActivityIndicator,
  Image,
} from "react-native";
import DatePicker from "react-native-date-ranges";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, doc, getDoc, addDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../../firebase";
import styles from "./styles";

const RoomScreen = ({ navigation, route }) => {
  const { roomId, hotelId, hotelName, roomName } = route.params || {
    roomId: null,
    hotelId: null,
    hotelName: "Hotel",
    roomName: "Room",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [room, setRoom] = useState();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isBookingModalVisible, setBookingModalVisibility] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [bookingLastName, setBookingLastName] = useState("");
  const [bookingPhoneNumber, setBookingPhoneNumber] = useState("");
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setIsLoading(true);

        const querySnapshot = await getDoc(doc(db, "rooms", roomId));

        if (querySnapshot.exists()) {
          const roomData = querySnapshot.data();

          const imageRef = await ref(storage, roomData.imageUrl);
          const imageURL = await getDownloadURL(imageRef);

          const roomF = {
            id: querySnapshot.id,
            roomName: roomData.roomName,
            description: roomData.description,
            price: roomData.price,
            image: imageURL,
          };

          setRoom([roomF]);
        } else {
          console.error("Room not found");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching room:", error);
        setIsLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: hotelName + ": " + roomName,
      headerStyle: {
        backgroundColor: "#2F4F4F",
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  }, [navigation, hotelName]);

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setBookingModalVisibility(true);
  };

  const handleBookingConfirm = async () => {
    try {
      const newBooking = {
        hotelName: hotelName,
        roomName: roomName,
        hotelId: hotelId,
        roomId: selectedRoom.id,
        userId: auth.currentUser.uid,
        startDate: selectedDates.startDate,
        endDate: selectedDates.endDate,
        name: bookingName,
        lastName: bookingLastName,
        phoneNumber: bookingPhoneNumber,
      };

      await addDoc(collection(db, "bookings"), newBooking);

      setBookingModalVisibility(false);
      // Diğer işlemleri gerçekleştir...
    } catch (error) {
      console.error("Error adding booking:", error);
    }
  };
  const customButton = (onConfirm) => {
    return (
      <Button
        onPress={onConfirm}
        style={{
          container: { width: "75%", marginHorizontal: "3%" },
          text: { fontSize: 20 },
        }}
        primary
        title="Submit"
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <FlatList
            data={room}
            renderItem={({ item }) => (
              <View style={styles.roomItem}>
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={styles.roomImage}
                    resizeMode="cover"
                  />
                )}
                <Text style={styles.roomDescription}>
                  Room: {item.roomName}
                </Text>
                <Text style={styles.roomDescription}>
                  Description: {item.description}
                </Text>
                <Text style={styles.roomPrice}>Price: {item.price}</Text>
                <TouchableOpacity onPress={() => handleBookNow(item)}>
                  <Text style={styles.bookNowButton}>Book Now</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={isBookingModalVisible}
            onRequestClose={() => setBookingModalVisibility(false)}
          >
            <View style={styles.bookingModal}>
              <Text style={styles.bookingModalTitle}>Book Now</Text>
              <TextInput
                style={styles.bookingInput}
                placeholder="Name"
                value={bookingName}
                onChangeText={(text) => setBookingName(text)}
              />
              <TextInput
                style={styles.bookingInput}
                placeholder="Last Name"
                value={bookingLastName}
                onChangeText={(text) => setBookingLastName(text)}
              />
              <TextInput
                style={styles.bookingInput}
                placeholder="Phone Number"
                value={bookingPhoneNumber}
                onChangeText={(text) => setBookingPhoneNumber(text)}
                keyboardType="phone-pad"
              />
              <View style={styles.datePickerContainer}>
                <DatePicker
                  calendarBgColor="2F4F4F"
                  selectedBgColor="black"
                  customButton={(onConfirm) => customButton(onConfirm)}
                  onConfirm={(dates) => setSelectedDates(dates)}
                  allowFontScaling={false}
                  placeholder={"Select Your Dates"}
                  mode={"range"}
                  style={styles.datePicker}
                  markText={"Booking Date"}
                />
              </View>
              <TouchableOpacity
                style={styles.bookingButton}
                onPress={handleBookingConfirm}
              >
                <Text style={styles.bookingButtonText}>Confirm Booking</Text>
              </TouchableOpacity>
              <Button
                title="Cancel"
                onPress={() => setBookingModalVisibility(false)}
              />
            </View>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
};

export default RoomScreen;