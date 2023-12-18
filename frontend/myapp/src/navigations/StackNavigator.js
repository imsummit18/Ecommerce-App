import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import LoginScreen from "../screens/loginScreen";
import RegisterScreen from "../screens/registerScreen";
import HomeScreen from "../screens/homeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import ProfileScreen from "../screens/profileScreen";
import { Ionicons } from "@expo/vector-icons";
import CartScreen from "../screens/cartScreen";
import ProductInfoScreen from "../screens/productInfoScreen";
import AddressScreen from "../screens/AddressScreen";
import Address from "../screens/Address";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "@react-navigation/native";
import ConfirmationScreen from "../screens/ConfirmationScreen";
export default function StackNavigator() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const BottomTab = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: {
              color: "#00BE97",
            },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#00BE97" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: {
              color: "#00BE97",
            },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={24} color="#00BE97" />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: "Cart",
            tabBarLabelStyle: {
              color: "#00BE97",
            },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="cart" size={24} color="#00BE97" />
              ) : (
                <Ionicons name="cart-outline" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          options={{ headerShown: false }}
          component={RegisterScreen}
        />
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={BottomTab}
        />

        <Stack.Screen
          name="Info"
          options={{ headerShown: false }}
          component={ProductInfoScreen}
        />
        <Stack.Screen
          name="Address"
          options={{ headerShown: false }}
          component={AddressScreen}
        />
        <Stack.Screen
          name="Add"
          options={{ headerShown: false }}
          component={Address}
        />
        <Stack.Screen
          name="Confirm"
          options={{ headerShown: false }}
          component={ConfirmationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
