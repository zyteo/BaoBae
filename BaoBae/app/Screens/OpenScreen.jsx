import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import colours from "../Config/colours";

const OpenScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>BaoBae</Text>
      <Text>Taobao Clone</Text>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
      <Button title="Sign Up" onPress={() => navigation.navigate("Signup")} />
    </View>
  );
};

export default OpenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
