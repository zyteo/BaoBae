import { Route } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Button, Image, StyleSheet } from "react-native";
import { getCurrentUser, getItemSpecific } from "../../firebase";
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

const CartScreen = ({ route, navigation }) => {
  const userEmail = route.params.email;
  const [user, setUser] = useState([]);
  let cartArray = [];
  let cartObjects = user.cart;
  for (const item in cartObjects) {
    cartArray.push(cartObjects[item]);
    console.log(cartArray);
  }

  useEffect(() => {
    getCurrentUser(userEmail, setUser);
  }, []);

  return (
    <View style={styles.horizontalcontainer}>
      <Text>{user.username}'s cart</Text>
      {cartArray?.map((element) => {
        return (
          <>
            <View key={element.name}>
              <Text>{element.name}</Text>
              <Text>${element.price}</Text>
              <Text>{element.quantity}</Text>

              <Image
                style={styles.photo}
                source={{
                  uri: element.image,
                }}
              />
            </View>
          </>
        );
      })}

      <Button
        title="Back"
        onPress={() => navigation.push("Browse", { email: userEmail })}
      />
      <Button
        title="BUY"
        onPress={() =>
          navigation.push("Account", {
            email: userEmail,
          })
        }
      />
    </View>
  );
};

export default CartScreen;
