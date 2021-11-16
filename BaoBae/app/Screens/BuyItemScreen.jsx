import { Route } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import {
  getCurrentUser,
  getItemSpecific,
  updateUserBoughtItems,
} from "../../firebase";
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
  photo: {
    width: 300,
    height: 300,
  },
});

const BuyItemScreen = ({ route, navigation }) => {
  const itemName = route.params.name;
  const userEmail = route.params.email;
  const [itemSpecific, setItemSpecific] = useState([]);
  const [user, setUser] = useState([]);
  const [buyItemQuantity, setBuyItemQuantity] = useState();

  // handle for user adding to cart
  const handleBuyItem = () => {
    // alert if passwords dont match
    if (Number.isNaN(parseInt(buyItemQuantity)) == true) {
      Alert.alert("Oops!", "Numbers only!", [{ text: "OK" }]);
    } else if (parseInt(buyItemQuantity) > 10) {
      Alert.alert("CoNsuMeRiSm BaD!", "Y U WAN buy so many? 10 max!!", [
        { text: "YES BOSS" },
      ]);
    } else if (parseInt(buyItemQuantity) <= 0) {
      Alert.alert("Huh?", "You want to buy or not?", [{ text: "INDECISIVE" }]);
    } else {
      updateUserBoughtItems(
        userEmail,
        itemSpecific.name,
        itemSpecific.price,
        parseInt(buyItemQuantity),
        itemSpecific.image
      );
      Alert.alert(
        "Buy liao!",
        `You bought ${buyItemQuantity} ${itemSpecific.name} at $ ${
          itemSpecific.price
        } each, for a total of $ ${
          parseInt(buyItemQuantity) * itemSpecific.price
        }.`,
        [{ text: "TY 4 MAKING ME BROKE" }]
      );
      navigation.push("Account", {
        email: userEmail,
      });
    }
  };

  useEffect(() => {
    getItemSpecific(itemName, setItemSpecific);
    getCurrentUser(userEmail, setUser);
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
      <Text>{itemSpecific.description}</Text>
      <Text>${itemSpecific.price}</Text>
      <Text>Quantity: {itemSpecific.quantity}</Text>
      <Text>{user.username}, how many items would you like to purchase?</Text>
      <TextInput
        style={styles.input}
        placeholder="How many?"
        onChangeText={(text) => setBuyItemQuantity(text)}
        value={buyItemQuantity}
        keyboardType="numeric"
      />
      <Button title="BUY!" onPress={() => handleBuyItem()} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      {itemSpecific.comments ? <Text>Comment</Text> : <></>}
    </View>
  );
};

export default BuyItemScreen;
