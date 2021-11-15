import { Route } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TextInput, View, Button, Image } from "react-native";

const ItemScreen = ({ route, navigation }) => {
  const item = route.params.name;

  return (
    <View style={{ padding: 10 }}>
      <Text>{item}</Text>
      <Button title="Add to cart" onPress={() => navigation.push("Browse")} />
      <Button title="BUY" onPress={() => navigation.push("Browse")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ItemScreen;
