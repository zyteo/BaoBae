import React, { useState } from "react";
import { Text, TextInput, View, Button, Alert } from "react-native";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const handleSignUp = () => {
    if (password !== passwordCheck) {
      Alert.alert("Oops!", "Passwords do not match!", [{ text: "OK" }]);
    } else {
      
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
      <Text>Confirm Password: </Text>
      <TextInput
        secureTextEntry={true}
        style={{ height: 40 }}
        placeholder="Confirm Password"
        onChangeText={(text) => setPasswordCheck(text)}
        value={passwordCheck}
      />

      <Button title="Sign up" onPress={() => handleSignUp()} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default SignupScreen;
