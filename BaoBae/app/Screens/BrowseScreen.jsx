import React, { useState } from "react";
import { Text, TextInput, View, Button } from "react-native";

const BrowseScreen = ({ navigation }) => {
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ padding: 10, fontSize: 42 }}>
        Browse
      </Text>
      <Button title="Go Home" onPress={() => navigation.push("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default BrowseScreen;
