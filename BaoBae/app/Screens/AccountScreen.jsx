import React, { useState } from "react";
import { Text, TextInput, View, Button } from "react-native";
import { logOutUser } from "../../firebase";

const AccountScreen = ({ navigation }) => {
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ padding: 10, fontSize: 42 }}>Account</Text>
      <Button title="Back to items" onPress={() => navigation.push("Browse")} />
      <Button title="Logout" onPress={() => logOutUser(navigation)} />
    </View>
  );
};

export default AccountScreen;
