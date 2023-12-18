import React from "react";
import { Pressable, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function SearchBar() {
  return (
    <View
      style={{
        backgroundColor: "#00CED1",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 7,
          gap: 10,
          backgroundColor: "white",
          borderRadius: 3,
          height: 38,
          flex: 1,
        }}
      >
        <Ionicons
          style={{ marginLeft: 10 }}
          name="search"
          size={22}
          color="black"
        />
        <TextInput placeholder="Search Amazon.in" />
      </Pressable>
      <Feather name="mic" size={22} color="black" />
    </View>
  );
}
