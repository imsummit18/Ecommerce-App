import React, { useEffect, useState } from "react";
import { Pressable, ScrollView } from "react-native";
import { Text, View } from "react-native";
import SearchBar from "../../components/searchBar";
import { MaterialIcons } from "@expo/vector-icons";
import { Service } from "../../Service/Service";
import { Ionicons } from "@expo/vector-icons";

const AddressScreen = ({ navigation }) => {
  const [address, setAddress] = useState([]);
  console.log("The address are", address);
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await Service.get("/address");
        setAddress(response.data.data[0].address);
      } catch (err) {
        console.log("The err  while fetching user address is", err);
      }
    };
    fetchAddress();
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 55 }}>
      <SearchBar />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Address</Text>
        <Pressable
          onPress={() => navigation.navigate("Add")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "#d0d0d0",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 7,
            paddingHorizontal: 5,
          }}
        >
          <Text>Add a new Address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        {address.map((el, index) => (
          <Pressable
            style={{
              borderWidth: 1,
              borderColor: "#d0d0d0",
              padding: 10,
              flexDirection: "column",
              gap: 5,
              marginVertical: 10,
            }}
          >
            <View
              key={index}
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
            >
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {el.name}
              </Text>
              <Ionicons name="md-location-sharp" size={24} color="red" />
            </View>
            <Text style={{ fontSize: 15, color: "#181818" }}>
              {el?.landmark}
            </Text>
            <Text style={{ fontSize: 15, color: "#181818" }}>{el?.street}</Text>
            <Text style={{ fontSize: 15, color: "#181818" }}>
              Kathmandu, Nepal
            </Text>
            <Text style={{ fontSize: 15, color: "#181818" }}>
              {el?.postalCode}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 7,
                gap: 10,
              }}
            >
              <Pressable
                style={{
                  backgroundColor: "#f5f5f5",
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 5,
                  borderWidth: 0.9,
                  borderColor: "#d0d0d0",
                }}
              >
                <Text>Edit</Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "#f5f5f5",
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 5,
                  borderWidth: 0.9,
                  borderColor: "#d0d0d0",
                }}
              >
                <Text>Remove</Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "#f5f5f5",
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 5,
                  borderWidth: 0.9,
                  borderColor: "#d0d0d0",
                }}
              >
                <Text>Set as Default</Text>
              </Pressable>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default AddressScreen;
