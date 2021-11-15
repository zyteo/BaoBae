import { Route } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Button, Image, StyleSheet } from "react-native";
import { getItemSpecific } from "../../firebase";
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

const ItemScreen = ({ route, navigation }) => {
  const itemName = route.params.name;
  const [itemSpecific, setItemSpecific] = useState([]);

  useEffect(() => {
    getItemSpecific(itemName, setItemSpecific);
  }, []);

  return (
    <View style={styles.container}>
      <Text>{itemSpecific.name}</Text>
      <Image
        style={styles.photo}
        source={{
          uri: itemSpecific.image,
        }}
      />
      <Text>Description: {itemSpecific.name}</Text>
      <Text>Price: ${itemSpecific.price}</Text>
      <Text>Quantity: {itemSpecific.quantity}</Text>

      <Button title="Add to cart" onPress={() => navigation.push("Browse")} />
      <Button title="BUY" onPress={() => navigation.push("Browse")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ItemScreen;
