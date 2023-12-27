import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  RefreshControl,
  Image,
} from "react-native";
import filter from "lodash.filter";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, query, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase";
import styles from "./styles";

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [fullHotelsData, setFullHotelsData] = useState([]);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setIsLoading(true);
      const userQuery = query(collection(db, "hotels"));
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
      const filteredHotelList = hotelList.filter((hotel) => hotel !== null);

      setHotels(filteredHotelList);
      setFullHotelsData(filteredHotelList);
    } catch (error) {
      console.error("Otel bilgileri getirme hatası:", error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const handleSearch = (searchText) => {
    setSearch(searchText);

    // Otelleri filtrele ve yeni listeyi oluştur
    const filteredHotels = filter(fullHotelsData, (hotel) => {
      return (
        hotel.name.toLowerCase().includes(searchText.toLowerCase()) ||
        hotel.city.toLowerCase().includes(searchText.toLowerCase())
      );
    });

    // Filtrelenmiş otelleri set et
    setHotels(filteredHotels);
  };

  const handleHotelPress = (hotelName, hotelId) => {
    // Tıklanan otelin sayfasına yönlendirme yap
    navigation.navigate("HotelScreen", { hotelName, hotelId });
  };

  const renderHotelItem = ({ item }) => (
    <TouchableOpacity
      style={styles.hotelItem}
      onPress={() => handleHotelPress(item.name, item.id)}
    >
      <View>
        {item.image ? (
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: item.image }}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <Text style={styles.hotelName}>{item.name}</Text>
      <Text style={styles.hotelCity}>{item.city}</Text>
    </TouchableOpacity>
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchHotels();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => null,
      title: "Oteller",
      headerStyle: {
        backgroundColor: "#2F4F4F",
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <View style={styles.searchBarContainer}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                value={search}
                onChangeText={(searchText) => handleSearch(searchText)}
                placeholder="Otel veya Şehir Ara"
                autoFocus={true}
                style={styles.searchBarInput}
              />
            </View>
            <FlatList
              data={hotels}
              renderItem={renderHotelItem}
              keyExtractor={(item) => item.id}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
