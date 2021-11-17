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
  ScrollView,
} from "react-native";
import {
  getCurrentUser,
  getItemSpecific,
  removeCartItem,
  updateBuyItemsFromCart,
  updateItemQuantity,
} from "../../firebase";
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
  }

  // handle for user to buy item from cart
  const handleBuyItem = (buyItemQuantity, itemName, itemPrice, itemImage) => {
    updateBuyItemsFromCart(
      userEmail,
      itemName,
      itemPrice,
      buyItemQuantity,
      itemImage
    );

    Alert.alert(
      "Buy liao!",
      `You bought ${buyItemQuantity} ${itemName} at $ ${itemPrice} each, for a total of $ ${
        parseInt(buyItemQuantity) * itemPrice
      }.`,
      [{ text: "TY 4 MAKING ME BROKE" }]
    );
    updateItemQuantity(itemName, buyItemQuantity);
    navigation.push("Account", {
      email: userEmail,
    });
  };

  const handleRemoveCartItem = (email, item) => {
    removeCartItem(email, item);
    Alert.alert("Item removed!", "Gudbai", [{ text: "$ave $" }]);
    navigation.push("Cart", { email: userEmail });
  };

  useEffect(() => {
    getCurrentUser(userEmail, setUser);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {cartArray.length > 0 ? (
          <Text>{user.username}'s cart:</Text>
        ) : (
          <Text>{user.username}, your cart is empty.</Text>
        )}
        {cartArray?.map((element, index) => {
          return (
            <>
              <View key={index} style={styles.horizontalcontainer}>
                <Text>{element.name}</Text>
                <Text>${element.price}</Text>
                <Text>{element.quantity}</Text>

                <Image
                  style={styles.photo}
                  source={{
                    uri: element.image,
                  }}
                />
                <Button
                  title="Buy"
                  onPress={() =>
                    handleBuyItem(
                      element.quantity,
                      element.name,
                      element.price,
                      element.image
                    )
                  }
                />
                <Button
                  title="Remove from cart"
                  onPress={() => handleRemoveCartItem(userEmail, element.name)}
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
          title="Account"
          onPress={() =>
            navigation.push("Account", {
              email: userEmail,
            })
          }
        />
      </View>
    </ScrollView>
  );
};

export default CartScreen;
