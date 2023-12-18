import React from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";
export default function InputField({
  value,
  onChangeText,
  styles,
  placeholder,
  icon,
  showText,
}) {
  return (
    <View style={styles}>
      {icon}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={showText}
      />
    </View>
  );
}
