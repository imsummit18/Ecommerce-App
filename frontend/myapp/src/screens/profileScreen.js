import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";

const ProfileScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate("Login");
    } catch (err) {
      console.log("The err is", err);
    }
  };
  return (
    <SafeAreaView style={{ marginTop: 55 }}>
      <Pressable onPress={handleLogout}>
        <Text>logout</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;
