import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProfileScreen from "../screens/Profile/ProfileScreen";
import EditProfileScreen from "../screens/EditProfile/EditProfileScreen";
import AccommodationScreen from "../screens/Accommodation/AccommodationScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ManageHotelScreen from "../screens/ManageHotel/ManageHotelScreen";
import LoginScreen from "../screens/Login/LoginScreen";
import HotelScreen from "../screens/Hotel/HotelScreen";
import RoomScreen from "../screens/Room/RoomScreen";
import AddHotelScreen from "../screens/AddHotel/AddHotelScreen";
import GuestsScreen from "../screens/Guests/GuestsScreen";
import AddRoomScreen from "../screens/AddRoom/AddRoomScreen";
import EditHotelScreen from "../screens/EditHotel/EditHotelScreen";
import EditRoomScreen from "../screens/EditRoom/EditRoomScreen";
import SignUp from "../screens/SignUp/SignUp";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";

import { SimpleLineIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const ProfileStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const LoginStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ManageHotelStack = createStackNavigator();

const TabNavigator = () => {
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userId = auth.currentUser.uid;
        const userQuery = query(
          collection(db, "users"),
          where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          // Assuming there's only one document for each user
          const userDoc = querySnapshot.docs[0].data();
          setUserRole(userDoc.role);
        } else {
          // Handle the case where the user document is not found
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#f8fafb",
          borderBottomColor: "transparent",
          borderTopColor: "transparent", // Üst kenarlık çizgisi kaldırıldı
          shadowColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeLayout}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Fontisto name="home" size={30} color="#0e53b2" />
            ) : (
              <SimpleLineIcons name="home" size={24} color="#2F4F4F" />
            ),
        }}
      />
      {userRole === "hotelOwner" && (
        <Tab.Screen
          name="Manage Hotel"
          component={ManageHotelLayout}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome5 name="hotel" size={30} color="#0e53b2" />
              ) : (
                <Fontisto name="hotel" size={24} color="#2F4F4F" />
              ),
          }}
        />
      )}
      <Tab.Screen
        name="Profile"
        component={ProfileLayout}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={30} color="#0e53b2" />
            ) : (
              <Ionicons name="person-outline" size={24} color="#2F4F4F" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};
const LoginLayout = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <LoginStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: "SignUp",
          headerStyle: {
            backgroundColor: "#0e53b2",
            borderBottomColor: "transparent",
            shadowColor: "transparent",
          },
          headerTitleStyle: {
            fontSize: 28, // İstediğiniz büyüklükte bir değer
            color: "#fff", // Başlığın rengi
            fontWeight: 500, // Kalınlık (normal, bold, etc.)
            marginLeft: 5, // Başlığı sağa kaydır
          },
        }}
      />
      <LoginStack.Screen
        name="Inside"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </LoginStack.Navigator>
  );
};
const HomeLayout = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="HotelScreen"
        component={HotelScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="RoomScreen"
        component={RoomScreen}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};
const ManageHotelLayout = () => {
  return (
    <ManageHotelStack.Navigator>
      <ManageHotelStack.Screen
        name="ManageHotelScreen"
        component={ManageHotelScreen}
        options={{
          headerShown: false,
        }}
      />
      <ManageHotelStack.Screen
        name="AddHotelScreen"
        component={AddHotelScreen}
        options={{
          title: "Add Hotel",
          headerStyle: {
            backgroundColor: "#0e53b2",
            borderBottomColor: "transparent",
            shadowColor: "transparent",
          },
          headerTitleStyle: {
            fontSize: 28, // İstediğiniz büyüklükte bir değer
            color: "#fff", // Başlığın rengi
            fontWeight: 500, // Kalınlık (normal, bold, etc.)
            marginLeft: 5, // Başlığı sağa kaydır
          },
        }}
      />
      <ManageHotelStack.Screen
        name="EditHotelScreen"
        component={EditHotelScreen}
        options={{
          headerShown: false,
        }}
      />
      <ManageHotelStack.Screen
        name="EditRoomScreen"
        component={EditRoomScreen}
        options={{
          title: "Edit Hotel room",
          headerStyle: {
            backgroundColor: "#0e53b2",
          },
        }}
      />
      <ManageHotelStack.Screen
        name="AddRoomScreen"
        component={AddRoomScreen}
        options={{
          title: "Add New Room",
          headerStyle: {
            backgroundColor: "#0e53b2",
            borderBottomColor: "transparent",
            shadowColor: "transparent",
          },
          headerTitleStyle: {
            fontSize: 28, // İstediğiniz büyüklükte bir değer
            color: "#fff", // Başlığın rengi
            fontWeight: 500, // Kalınlık (normal, bold, etc.)
            marginLeft: 5, // Başlığı sağa kaydır
          },
        }}
      />
      <ManageHotelStack.Screen
        name="GuestsScreen"
        component={GuestsScreen}
        options={{
          title: "My Guests",
          headerStyle: {
            backgroundColor: "#0e53b2",
            borderBottomColor: "transparent",
            shadowColor: "transparent",
          },
          headerTitleStyle: {
            fontSize: 28, // İstediğiniz büyüklükte bir değer
            color: "#fff", // Başlığın rengi
            fontWeight: 500, // Kalınlık (normal, bold, etc.)
            marginLeft: 5, // Başlığı sağa kaydır
          },
        }}
      />
    </ManageHotelStack.Navigator>
  );
};
const ProfileLayout = () => {
  return (
    <ProfileStack.Navigator initialRouteName="ProfileStack">
      <ProfileStack.Screen
        name="ProfileStack"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: "Edit Profile",
          headerStyle: {
            backgroundColor: "#0e53b2",
            borderBottomColor: "transparent",
            shadowColor: "transparent",
          },
          headerTitleStyle: {
            fontSize: 28, // İstediğiniz büyüklükte bir değer
            color: "#fff", // Başlığın rengi
            fontWeight: 500, // Kalınlık (normal, bold, etc.)
            marginLeft: 5, // Başlığı sağa kaydır
          },
        }}
      />
      <ProfileStack.Screen
        name="AccommodationScreen"
        component={AccommodationScreen}
        options={{
          title: "Accommodation",
          headerStyle: {
            backgroundColor: "#0e53b2",
          },
        }}
      />
    </ProfileStack.Navigator>
  );
};

const AppContainer = () => {
  return (
    <NavigationContainer>
      <LoginLayout />
    </NavigationContainer>
  );
};

export default AppContainer;