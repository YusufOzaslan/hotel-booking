import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addDoc, collection, getDoc } from "firebase/firestore";
import { auth, db, storage } from "../../../firebase";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import styles from "./styles";

const AddHotelScreen = ({ navigation }) => {
  const [hotelName, setHotelName] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleAddHotel = async () => {
    if (!image) {
      // Eğer resim seçilmediyse, işlemi sonlandır
      Alert.alert("Warning", "Please pick an image before uploading.");
      return;
    }
    setUploading(true);
    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      const fileName = uri.substring(uri.lastIndexOf("/") + 1);
      const storageRef = ref(storage, `hotelImages/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error("Error uploading image: ", error);
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);
          setUploading(false);

          const newHotel = {
            adminUserId: auth.currentUser.uid,
            name: hotelName,
            city: city,
            imageURL: downloadURL,
          };

          try {
            const docRef = await addDoc(collection(db, "hotels"), newHotel);

            // Otel başarıyla eklendikten sonra kullanıcıya bilgi vermek için Alert kullanımı
            Alert.alert("Success", "New hotel added successfully!");

            const addedDoc = await getDoc(docRef);
            const addedData = addedDoc.data;

            navigation.navigate("EditHotelScreen", {
              hotelId: docRef.id,
              hotelName: addedData.name,
            });
          } catch (error) {
            console.error("Error adding room: ", error);
          }
        }
      );
    } catch (error) {
      console.error("Error adding hotel: ", error);
      setUploading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>

        <Text style={styles.headerText}>Add New Hotel</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Hotel Name"
            value={hotelName}
            onChangeText={(text) => setHotelName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={(text) => setCity(text)}
          />
        </View>


        <View style={styles.butonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handlePickImage}>
            <Text style={styles.addButtonLabel}>Pick an Image</Text>
          </TouchableOpacity>

          <View style={styles.imageContainer}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: 220 }}
              />
            )}
          </View>
          
          <TouchableOpacity style={styles.addHotelButton} onPress={handleAddHotel}>
            <Text style={styles.addButtonLabel}>Add Hotel</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AddHotelScreen;
