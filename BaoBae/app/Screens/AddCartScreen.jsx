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
  updateCartUser,
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
const AddCartScreen = ({ route, navigation }) => {
  const itemName = route.params.name;
  const userEmail = route.params.email;
  const [itemSpecific, setItemSpecific] = useState([]);
  const [user, setUser] = useState([]);
  const [addCartQuantity, setAddCartQuantity] = useState();

  // handle for user adding to cart
  const handleAddCart = () => {
    // alert if passwords dont match
    if (Number.isNaN(parseInt(addCartQuantity)) == true) {
      Alert.alert("Oops!", "Numbers only!", [{ text: "OK" }]);
    } else if (parseInt(addCartQuantity) > 10) {
      Alert.alert("CoNsuMeRiSm BaD!", "Boss say limit to 10 only OK", [
        { text: "YES BOSS" },
      ]);
    } else if (parseInt(addCartQuantity) <= 0) {
      Alert.alert("Huh?", "You want to buy or not?", [{ text: "INDECISIVE" }]);
    } else {
      updateCartUser(
        userEmail,
        itemSpecific.name,
        itemSpecific.price,
        parseInt(addCartQuantity),
        itemSpecific.image
      );
      Alert.alert(
        "Added to cart!",
        `You added ${addCartQuantity} ${
          itemSpecific.name
        } to your cart. YOU HAVE THE POTENTIAL to lose $ ${
          parseInt(addCartQuantity) * itemSpecific.price
        } once you buy it!`,
        [{ text: "YAY I GOT POTENTIAL!" }]
      );
      navigation.navigate("Browse", { email: userEmail });
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
      <Text>
        {user.username}, how many items would you like to add to cart?
      </Text>
      <TextInput
        style={styles.input}
        placeholder="How many?"
        onChangeText={(text) => setAddCartQuantity(text)}
        value={addCartQuantity}
        keyboardType="numeric"
      />
      <Button title="ADD!" onPress={() => handleAddCart()} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      {itemSpecific.comments ? <Text>Comment</Text> : <></>}
    </View>
  );
};
export default AddCartScreen;
