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
} from "react-native";
import filter from "lodash.filter";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "./styles";

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [fullHotelsData, setFullHotelsData] = useState([]);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setIsLoading(true);
      const userQuery = query(collection(db, "hotels"));
      const querySnapshot = await getDocs(userQuery);
      const hotelList = [];

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          hotelList.push({
            id: doc.id,
            name: data.name,
            city: data.city,
            // Diğer otel özellikleri eklenebilir
          });
        });

        setHotels(hotelList);
        setFullHotelsData(hotelList); // Tam veriyi sakla
        setIsLoading(false);
      } else {
        // Handle the case where the user document is not found
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
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
      title: "Hotels",
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
                placeholder="Search Hotel or City"
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
