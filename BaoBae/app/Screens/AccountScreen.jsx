import React, { useEffect, useState } from "react";
import { Text, TextInput, View, Button, StyleSheet } from "react-native";
import { getCurrentUser, logOutUser } from "../../firebase";
import colours from "../Config/colours";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  horizontalcontainer: {
    flex: 1,
    backgroundColor: colours.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: colours.inputbox,
    color: colours.inputboxtext,
    borderColor: colours.border,
  },
  photo: {
    width: 50,
    height: 50,
  },
});

const AccountScreen = ({ navigation, route }) => {
  const userEmail = route.params.email;
  const [user, setUser] = useState([]);

  useEffect(() => {
    getCurrentUser(userEmail, setUser);
  }, []);
  return (
    <View style={styles.container}>
      <Text>{user.username}'s Account</Text>
      <Button
        title="Back to items"
        onPress={() => navigation.push("Browse", { email: userEmail })}
      />
      <Button title="Logout" onPress={() => logOutUser(navigation)} />
    </View>
  );
};

export default AccountScreen;
