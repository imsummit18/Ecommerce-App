import React, { useState } from "react";
import {
  Alert,
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
import { Service } from "../../Service/Service";

export default function RegisterScreen({ navigation }) {
  const [input, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleTextChange = (fieldName, text) => {
    setInputs({ ...input, [fieldName]: text });
  };

  const handleRegister = async () => {
    try {
      const payload = {
        name: input.name,
        email: input.email,
        password: input.password,
      };
      const response = await Service.post("/user/signup", payload);
      console.log("The resposne is", response);
      Alert.alert("Registation Successfull","You have successfully register");
      setInputs({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      Alert.alert("Registation Error","An error has occured");
      console.log("Cannot regsiter", error);
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
          <Text style={styles.loginText}>Register to Your account</Text>
        </View>

        <View style={styles.formInput}>
          <InputField
            icon={<AntDesign name="lock1" size={24} color="gray" />}
            styles={styles.inputText}
            placeholder={"Enter your name"}
            value={input.name}
            onChangeText={(text) => handleTextChange("name", text)}
          />
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
            onPress={handleRegister}
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
              Register
            </Text>
          </TouchableOpacity>
        </View>
        <Pressable
          style={{ marginTop: 15 }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{ color: "gray", textAlign: "center", fontSize: 16 }}>
            Already have an account ? Sign In
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
