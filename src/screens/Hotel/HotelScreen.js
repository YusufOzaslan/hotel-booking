import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../../firebase";
import styles from "./styles";

const HotelScreen = ({ navigation, route }) => {
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
      }
    };

    if (hotelId) {
      fetchRooms();
    }
  }, [hotelId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: hotelName,
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
            <TouchableOpacity
              style={styles.roomItem}
              onPress={() => {
                // Odaya tıklandığında RoomScreen'e git
                navigation.navigate("RoomScreen", {
                  roomId: item.id,
                  hotelId,
                  hotelName,
                  roomName: item.roomName,
                });
              }}
            >
              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={styles.roomImage}
                  resizeMode="cover"
                />
              )}
              <Text style={styles.roomDescription}>{item.roomName}</Text>
              <Text style={styles.roomDescription}>{item.description}</Text>
              <Text style={styles.roomPrice}>Price: {item.price}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default HotelScreen;
