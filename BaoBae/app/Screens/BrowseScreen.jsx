import React, { useState } from "react";
import { Text, TextInput, View, Button } from "react-native";
import { auth } from "../../firebase";

const BrowseScreen = ({ navigation }) => {

  // handle function for logging out
  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Home");
      })
      .catch((error) => console.log(error));
  };
  
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ padding: 10, fontSize: 42 }}>Browse</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Logout" onPress={() => handleLogOut()} />
    </View>
  );
};

export default BrowseScreen;
