import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProfileScreen from "../screens/Profile/ProfileScreen";
import EditProfileScreen from "../screens/EditProfile/EditProfileScreen";
import ReservationsScreen from "../screens/Reservations/ReservationsScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ManageHotelScreen from "../screens/ManageHotel/ManageHotelScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileStack">
      <Stack.Screen
        name="ProfileStack"
        component={ProfileScreen}
        options={{
          headerShown: false, // Bu satırı ekleyerek başlık çubuğunu gizleyin
        }}
      />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Reservations" component={ReservationsScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false, // Bu satırı ekleyerek başlık çubuğunu gizleyin
        }}
      />
      <Tab.Screen
        name="Manage Hotel"
        component={ManageHotelScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const AppContainer = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppContainer;
