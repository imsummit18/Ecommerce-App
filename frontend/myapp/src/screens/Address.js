import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Service } from "../../Service/Service";

const Address = ({ navigation }) => {
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");

  //   useEffect(() => {
  //     const fetchuser = async () => {
  //       try {
  //       } catch (err) {
  //         console.log("The err is", err);
  //       }
  //     };
  //     fetchUser();
  //   }, []);

  const handleAddAddress = async () => {
    try {
      const payload = {
        name: name,
        mobileNo: mobileNo,
        houseNo: houseNo,
        street: street,
        landmark: landmark,
        postalCode: postalCode,
      };
      const response = await Service.post("/address", payload);
      Alert.alert("Success!", "Address added Successfully");
      setName("");
      setMobileNo("");
      setHouseNo("");   
      setStreet("");
      setLandmark("");
      setPostalCode("");
      setTimeout(() => {
        navigation.goBack();
      }, 5000);
    } catch (err) {
      console.log("The err while saving address", err);
    }
  };
  return (
    <ScrollView style={{ marginTop: 55 }}>
      <View style={{ height: 50, backgroundColor: "#00ced1" }} />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Add a new Address
        </Text>
        <TextInput
          placeholder="Nepal"
          placeholderTextColor={"black"}
          style={{
            padding: 10,
            borderColor: "#d0d0dd0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Full Name (First and last name)
          </Text>
          <TextInput
            style={{
              padding: 10,
              borderColor: "#d0d0dd0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter your name"
            placeholderTextColor={"black"}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Mobile Number
          </Text>
          <TextInput
            style={{
              padding: 10,
              borderColor: "#d0d0dd0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter your mobile number"
            placeholderTextColor={"black"}
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>House Number</Text>
          <TextInput
            style={{
              padding: 10,
              borderColor: "#d0d0dd0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter your house number"
            placeholderTextColor={"black"}
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Area , Street, sector,village
          </Text>
          <TextInput
            style={{
              padding: 10,
              borderColor: "#d0d0dd0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter your area "
            placeholderTextColor={"black"}
            value={street}
            onChangeText={(text) => setStreet(text)}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>
          <TextInput
            style={{
              padding: 10,
              borderColor: "#d0d0dd0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Eg near hospital"
            placeholderTextColor={"black"}
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pin Code</Text>
          <TextInput
            style={{
              padding: 10,
              borderColor: "#d0d0dd0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter pin code"
            placeholderTextColor={"black"}
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
          />
        </View>
        <Pressable onPress={handleAddAddress}>
          <Text
            style={{
              backgroundColor: "#ffc727",
              padding: 20,
              textAlign: "center",
              color: "white",
              borderRadius: 5,
              marginTop: 20,
              marginBottom: 40,
              fontWeight: "bold",
            }}
          >
            Add Address
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Address;

const styles = StyleSheet.create({});
