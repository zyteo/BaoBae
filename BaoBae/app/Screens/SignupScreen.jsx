import React, { useState } from "react";
import { Text, TextInput, View, Button, Alert } from "react-native";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const handleSignUp = () => {
    if (password !== passwordCheck) {
      // Alert.alert("Notice!", "Passwords do not match!", [
      //   {
      //     text: "Ask me later",
      //     onPress: () => console.log("Ask me later pressed"),
      //   },
      //   {
      //     text: "Cancel",
      //     onPress: () => console.log("Cancel Pressed"),
      //     style: "cancel",
      //   },
      //   { text: "OK", onPress: () => console.log("OK Pressed") },
      // ]);
      console.log("not match");
    } else {
      console.log("match");
    }
  };
  return (
    <View style={{ padding: 10 }}>
      <TextInput
        style={{ height: 40 }}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        secureTextEntry={true}
        style={{ height: 40 }}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
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
