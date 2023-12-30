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
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { SafeAreaView } from "react-native-safe-area-context";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import styles from "./styles";

const AddRoomScreen = ({ navigation, route }) => {
  const { hotelId } = route.params;
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
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
      const storageRef = ref(storage, `rooms/${fileName}`);
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

          const newRoom = {
            hotelId: hotelId,
            roomName: roomName,
            description: description,
            price: price,
            imageUrl: downloadURL,
          };

          try {
            await addDoc(collection(db, "rooms"), newRoom);

            // Oda başarıyla eklendikten sonra kullanıcıya bilgi vermek için Alert kullanımı
            Alert.alert("Success", "New room added successfully!");

            navigation.goBack();
          } catch (error) {
            console.error("Error adding room: ", error);
          }
        }
      );
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const handleAddRoom = async () => {
    uploadImage();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerText}>Add New Room</Text>
        <TextInput
          style={styles.input}
          placeholder="Room Name"
          value={roomName}
          onChangeText={(text) => setRoomName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Room Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={(text) => setPrice(text)}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={pickImage}>
          <Text style={styles.addButtonLabel}>Pick an Image</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 300, height: 300 }}
            />
          )}
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddRoom}>
          <Text style={styles.addButtonLabel}>Add Room</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AddRoomScreen;
