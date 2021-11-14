import React, { useEffect, useState } from "react";
import { Text, TextInput, View, Button, Alert } from "react-native";
import { auth, signInUser } from "../../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log(email, password);
    if (email) {
      signInUser(email, password);
    }
  };

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Browse");
      }
    });
    return unSubscribe;
  }, []);
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
