import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SearchBar from "../../components/searchBar";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  decrementQuantity,
  incrmentQuantity,
  removeFromCart,
} from "../redux/cartReducer";
const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const increasedQuantity = (item) => {
    dispatch(incrmentQuantity(item));
  };
  const decreasedQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };
  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };
  return (
    <ScrollView style={{ marginTop: 55, flex: 1, backgroundColor: "white" }}>
      <SearchBar />
      <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "400" }}>Sub Total:</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>₹{total}</Text>
      </View>
      <Text style={{ marginHorizontal: 10 }}>EMI details Available</Text>
      <Pressable
        onPress={() => navigation.navigate("Confirm")}
        style={{
          backgroundColor: "#ffc72c",
          padding: 10,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          marginHorizontal: 10,
        }}
      >
        <Text>Proceed to buy {cart.length} items</Text>
      </Pressable>

      <Text
        style={{
          height: 1,
          borderColor: "#d0d0d0",
          borderWidth: 1,
          marginTop: 16,
        }}
      />

      <View style={{ marginHorizontal: 10 }}>
        {cart.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                backgroundColor: "white",
                marginVertical: 10,
                borderBottomColor: "#f0f0f0",
                borderWidth: 2,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                borderRightWidth: 0,
              }}
            >
              <Pressable
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Image
                    style={{
                      width: 140,
                      height: 140,
                      resizeMode: "contain",
                    }}
                    source={{ uri: item?.image }}
                  />
                </View>

                <View>
                  <Text numberOfLines={2} style={{ width: 150, marginTop: 10 }}>
                    {item?.title}
                  </Text>
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 }}
                  >
                    Rs {item?.price}
                  </Text>
                  <Image
                    style={{ width: 30, height: 30, resizeMode: "contain" }}
                    source={{
                      uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                    }}
                  />
                  <Text style={{ color: "green" }}>In Stock</Text>
                </View>
              </Pressable>

              <Pressable style={{ marginTop: 15, marginBottom: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 7,
                    borderRadius: 7,
                  }}
                >
                  <Pressable
                    onPress={() => decreasedQuantity(item)}
                    style={{
                      backgroundColor: "#d8d8d8",
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <AntDesign name="delete" size={24} color="black" />
                  </Pressable>
                  <Pressable
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 18,
                      paddingVertical: 6,
                    }}
                  >
                    <Text>{item.quantity}</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => increasedQuantity(item)}
                    style={{
                      backgroundColor: "#d8d8d8",
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <Feather name="plus" size={24} color="black" />
                  </Pressable>

                  {/* <Pressable
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 8,
                      paddingVertical: 10,
                      borderRadius: 5,
                      borderColor: "#c0c0c0",
                      borderWidth: "0.6",
                    }}
                    >
                    <Text>Delete</Text>
                  </Pressable> */}

                  <Pressable
                    onPress={() => deleteItem(item)}
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 8,
                      paddingVertical: 10,
                      borderRadius: 5,
                      borderColor: "#c0c0c0",
                      borderWidth: 0.6,
                      marginLeft: 20,
                    }}
                  >
                    <Text>Delete</Text>
                  </Pressable>
                </View>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <Pressable
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Pressable
                      style={{
                        backgroundColor: "white",
                        paddingHorizontal: 8,
                        paddingVertical: 10,
                        borderRadius: 5,
                        borderColor: "#c0c0c0",
                        borderWidth: 0.6,
                      }}
                    >
                      <Text>Save For Later</Text>
                    </Pressable>
                  </Pressable>
                  <Pressable
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Pressable
                      style={{
                        backgroundColor: "white",
                        paddingHorizontal: 8,
                        paddingVertical: 10,
                        borderRadius: 5,
                        borderColor: "#c0c0c0",
                        borderWidth: 0.6,
                        marginLeft: 1.0,
                      }}
                    >
                      <Text>See More Like this</Text>
                    </Pressable>
                  </Pressable>
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default CartScreen;
