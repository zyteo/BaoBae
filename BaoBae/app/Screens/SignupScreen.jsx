import React, { useEffect, useState } from "react";
import { Text, TextInput, View, Button, Alert, StyleSheet } from "react-native";
import { auth, signUpUser } from "../../firebase";
import colours from "../Config/colours";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 10,
    width: "90%",
    borderWidth: 1,
    padding: 10,
    backgroundColor: colours.inputbox,
    color: colours.inputboxtext,
    borderColor: colours.border,
  },
});

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  // handle for user sign up
  const handleSignUp = () => {
    // alert if passwords dont match
    if (password !== passwordCheck) {
      Alert.alert("Oops!", "Passwords do not match!", [{ text: "OK" }]);
    } else if (password.length < 6 || passwordCheck.length < 6) {
      Alert.alert("Oops!", "Password must be at least 6 characters!", [
        { text: "OK" },
      ]);
    } else if (username.length < 3) {
      Alert.alert("Oops!", "Username must be at least 3 characters!", [
        { text: "OK" },
      ]);
    } else {
      signUpUser(email, password, username, Alert);
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email: </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <Text>Username: </Text>
      <TextInput
        style={styles.input}
        placeholder="Username - Minimum 3 characters"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <Text>Password: </Text>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder="Password - Minimum 6 characters"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Text>Confirm Password: </Text>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
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
