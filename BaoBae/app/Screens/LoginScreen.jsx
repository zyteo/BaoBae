import React, { useEffect, useState } from "react";
import { Text, TextInput, View, Button, Alert } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState("");

  const handleLogin = () => {
    console.log(email, password);
    if (email) {
      
      if (response?.error) {
        console.log("err", response.error);
        return;
      }
    } else {
      Alert.alert(
        "Oops!",
        "Account not found. Please sign up for an account!",
        [{ text: "OK" }]
      );
    }
  };

  
  return (
    <View style={{ padding: 10 }}>
      <Text>Email: </Text>
      <TextInput
        style={{ height: 40 }}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <Text>Password: </Text>
      <TextInput
        secureTextEntry={true}
        style={{ height: 40 }}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <Button title="Login" onPress={() => handleLogin()} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default LoginScreen;
