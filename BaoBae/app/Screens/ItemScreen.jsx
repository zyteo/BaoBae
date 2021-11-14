import React, { useState } from "react";
import { Text, TextInput, View, Button, Image } from "react-native";

const ItemScreen = ({ navigation }) => {
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ padding: 10, fontSize: 42 }}>TISSUE</Text>
      <Button title="Add to cart" onPress={() => navigation.push("Browse")} />
      <Button title="BUY" onPress={() => navigation.push("Browse")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ItemScreen;
