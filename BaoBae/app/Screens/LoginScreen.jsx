import React, { useEffect, useState } from "react";
import { Text, TextInput, View, Button, Alert, StyleSheet } from "react-native";
import { auth, signInUser } from "../../firebase";
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

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect to direct user to browse screen once logged in
  useEffect(() => {
    const directBrowse = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email);
        navigation.navigate("Browse");
      }
    });
    return directBrowse;
  }, []);

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
      <Text>Password: </Text>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <Button
        title="Login"
        onPress={() => signInUser(email, password, Alert)}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default LoginScreen;
