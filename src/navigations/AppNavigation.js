import React, { useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProfileScreen from "../screens/Profile/ProfileScreen";
import EditProfileScreen from "../screens/EditProfile/EditProfileScreen";
import AccommodationScreen from "../screens/Accommodation/AccommodationScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ManageHotelScreen from "../screens/ManageHotel/ManageHotelScreen";
import LoginScreen from "../screens/Login/LoginScreen";
import SignUp from "../screens/SignUp/SignUp";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

import { SimpleLineIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const LoginStack = createStackNavigator();

const getUserRole = async () => {
  const userUid = auth.currentUser.uid;
  const userDocRef = doc(db, "hotel-booking-app", userUid);
  try {
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userRole = userDocSnap.data().rol;
      return userRole;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
};

//const userRole = await getUserRole();

function LoginLayout() {
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
            backgroundColor: "#2F4F4F",
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
}

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileStack">
      <Stack.Screen
        name="ProfileStack"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: "Edit Profile",
          headerStyle: {
            backgroundColor: "#2F4F4F",
          },
        }}
      />
      <Stack.Screen
        name="AccommodationScreen"
        component={AccommodationScreen}
        options={{
          title: "Accommodation",
          headerStyle: {
            backgroundColor: "#2F4F4F",
          },
        }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = async  () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#1a1a1a",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Fontisto name="home" size={24} color="#2F4F4F" />
            ) : (
              <SimpleLineIcons name="home" size={24} color="#2F4F4F" />
            ),
        }}
      />
      {getUserRole() === "hotelOwner" && (
        <Tab.Screen
          name="Manage Hotel"
          component={ManageHotelScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome5 name="hotel" size={24} color="#2F4F4F" />
              ) : (
                <Fontisto name="hotel" size={24} color="#2F4F4F" />
              ),
          }}
        />
      )}
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="#2F4F4F" />
            ) : (
              <Ionicons name="person-outline" size={24} color="#2F4F4F" />
            ),
        }}
      />
    </Tab.Navigator>
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
