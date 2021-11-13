import React, { useState } from "react";
import { Text, TextInput, View, Button } from "react-native";

const AccountScreen = ({ navigation }) => {
  return (
    <View style={{ padding: 10 }}>
      
      <Text style={{ padding: 10, fontSize: 42 }}>
        Account
      </Text>
      <Button title="Go Home" onPress={() => navigation.push("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default AccountScreen;
