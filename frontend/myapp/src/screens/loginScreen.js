import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import InputField from "../../components/InputField";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Service } from "../../Service/Service";

export default function LoginScreen({ navigation }) {
  const [input, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleTextChange = (fieldName, text) => {
    setInputs({ ...input, [fieldName]: text });
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          navigation.replace("Main");
        }
      } catch (err) {
        console.log("The err is", err);
      }
    };

    checkLoginStatus();
  }, []);
  const handleLogin = async () => {
    try {
      const payload = {
        email: input.email,
        password: input.password,
      };
      const response = await Service.post("/user/signin", payload);
      console.log("The resposne is", response);
      const token = await response.data.token;
      await AsyncStorage.setItem("token", token);
      navigation.replace("Main");
      //   Alert.alert("Login Successfull", "You have successfully loggedin");
      setInputs({
        name: "",
        email: "",
        password: "",
      });
    } catch (err) {
      Alert.alert("Login Failed", err);
      console.log("Error", err);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={{
            height: 100,
            width: 150,
          }}
          source={{
            uri: "https://m.media-amazon.com/images/G/01/gc/designs/livepreview/a_generic_white_10_us_noto_email_v2016_us-main._CB627448186_.png",
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.loginText}>Log In to Your account</Text>
        </View>

        <View style={styles.formInput}>
          <InputField
            icon={<MaterialIcons name="email" size={24} color="gray" />}
            styles={styles.inputText}
            placeholder={"Enter your email"}
            value={input.email}
            onChangeText={(text) => handleTextChange("email", text)}
          />
          <InputField
            icon={<AntDesign name="lock1" size={24} color="gray" />}
            styles={styles.inputText}
            placeholder={"Enter your password"}
            showText={true}
            value={input.password}
            onChangeText={(text) => handleTextChange("password", text)}
          />
        </View>

        <View style={styles.optionContainer}>
          <Text>Keep me logged in</Text>
          <Text style={{ color: "#007fff", fontWeight: "500" }}>
            Forget Password
          </Text>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: "#febe10",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
            }}
          >
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {" "}
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <Pressable
          style={{ marginTop: 15 }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={{ color: "gray", textAlign: "center", fontSize: 16 }}>
            Dont have an account ? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: "white",
    alignItems: "center",
  },
  loginText: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 12,
    color: "#041E42",
  },
  formInput: {
    marginTop: 40,
  },
  inputText: {
    width: 300,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#d0d0d0",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
  },
  optionContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnContainer: {
    marginTop: 50,
  },
});
