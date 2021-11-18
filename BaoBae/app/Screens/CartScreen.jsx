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
import styled from "styled-components/native";
import {
  getCurrentUser,
  getItemSpecific,
  removeCartItem,
  updateBuyItemsFromCart,
  updateItemQuantity,
} from "../../firebase";
import colours from "../Config/colours";


const StyledView = styled.View`
  flex: 1;
  background-color: ${colours.primary};
  alignItems: center;
  justifyContent: center;
  width: 100%;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  height: 40px;
  margin: 2px;
  borderWidth: 0.5px;
  borderRadius: 6px;
  padding: 8px;
  background-color: ${colours.buttonbox};
  color: ${colours.buttonboxtext};
  borderColor: ${colours.border};
  `;

const StyledTouchableOpacityText = styled.Text`
  color: ${colours.buttonboxtext};
  fontSize: 17px;
  `;

const StyledImage = styled.Image`
  width: 60px;
  height: 60px;
  borderRadius: 6px;
  `;

const StyledText = styled.Text`
  height: 20px;
  margin: 8px;
  color: ${colours.inputboxtext};
  fontSize: 16px;
  align-items: center;
  justify-content: center;
`;

const StyledViewItems = styled.View`
  flex: 1;
  background-color: ${colours.primary};
  align-items: center;
  justifyContent: center;
  width: 100%;
  flexDirection: column;
  flexWrap: wrap;
`;

const StyledHorizontalItems = styled.View`
  flex: 1;
  flexDirection: row;
  flexWrap: wrap;
  align-items: center;
  justifyContent: center;
  width: 95%;
  background-color: ${colours.itembox};
  margin: 8px;
  borderRadius: 6px;
`;

const StyledItem = styled.View`
  alignItems: center;
  justifyContent: center;
  margin: 8px;
`;

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
      <StyledView>
        {cartArray.length > 0 ? (
          <StyledText>{user.username}'s cart:</StyledText>
        ) : (
          <StyledText>{user.username}, your cart is empty.</StyledText>
        )}
        <StyledViewItems>
          {cartArray?.map((element, index) => {
            return (
              <StyledHorizontalItems key={index}>
                <StyledItem>
                  <StyledImage
                    source={{
                      uri: element.image,
                    }}
                  />
                  <Text>{element.name}</Text>
                </StyledItem>
                <StyledItem>
                  <Text>${element.price} each</Text>
                  <Text>{element.quantity} in cart</Text>
                </StyledItem>

                <StyledTouchableOpacity
                  onPress={() =>
                    handleBuyItem(
                      element.quantity,
                      element.name,
                      element.price,
                      element.image
                    )
                  }
                >
                  <StyledTouchableOpacityText>Buy</StyledTouchableOpacityText>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity
                  onPress={() => handleRemoveCartItem(userEmail, element.name)}
                >
                  <StyledTouchableOpacityText>
                    Remove
                  </StyledTouchableOpacityText>
                </StyledTouchableOpacity>
              </StyledHorizontalItems>
            );
          })}
        </StyledViewItems>

        <StyledTouchableOpacity
          onPress={() => navigation.push("Browse", { email: userEmail })}
        >
          <StyledTouchableOpacityText>Back</StyledTouchableOpacityText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity
          onPress={() =>
            navigation.push("Account", {
              email: userEmail,
            })
          }
        >
          <StyledTouchableOpacityText>Account</StyledTouchableOpacityText>
        </StyledTouchableOpacity>
      </StyledView>
    </ScrollView>
  );
};

export default CartScreen;
