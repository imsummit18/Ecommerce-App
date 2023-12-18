import React, { useState } from "react";
import { Image } from "react-native";
import { Pressable, View } from "react-native";
import { Text } from "react-native";
import { useDispatch } from "react-redux";
import { addToCart } from "../src/redux/cartReducer";

const ProductItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);
  const addedItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 6000);
  };
  return (
    <Pressable style={{ marginHorizontal: 20, marginVertical: 25 }}>
      <Image
        source={{ uri: item?.image }}
        style={{ resizeMode: "contain", width: 150, height: 150 }}
      />
      <Text style={{ width: 150, marginTop: 10 }}>{item?.title}</Text>
      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>₹{item?.price}</Text>
        <Text style={{ fontWeight: "bold", color: "#FFC72C" }}>
          {item?.rating?.rate} ratings
        </Text>
      </View>
      <Pressable
        onPress={() => addedItemToCart(item)}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        {addedToCart ? (
          <View>
            <Text>Added to Cart</Text>
          </View>
        ) : (
          <Text>Add To Cart</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;
