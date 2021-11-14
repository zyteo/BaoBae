import React, { useState } from "react";
import { Text, TextInput, View, Button } from "react-native";

const CartScreen = ({ navigation }) => {
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ padding: 10, fontSize: 42 }}>
        cart
      </Text>
      <Button title="Remove item" onPress={() => navigation.push("Browse")} />
      <Button title="BUY" onPress={() => navigation.push("Account")} />
    </View>
  );
};

export default CartScreen;
