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
  removeCartItem,
  updateBuyItemsFromCart,
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
  padding: 6px;
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

const StyledTextItem = styled.Text`
  color: ${colours.inputboxtext};
  fontSize: 13px;
  width: 100px;
  `;

const StyledHorizontalItems = styled.View`
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
  // save the params as a variable
  const userEmail = route.params.email;
  // react state
  const [user, setUser] = useState([]);

  // function to get the items in the user cart in an array
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
      itemImage,
      Alert
    );
    navigation.navigate("Browse", {
      email: userEmail,
    });
  };

  // handle for user to remove item from cart
  const handleRemoveCartItem = (email, item) => {
    removeCartItem(email, item);
    Alert.alert("Item removed!", "Goodbye items!", [{ text: "OK" }]);
    navigation.push("Cart", { email: userEmail });
  };

  // useEffect - upon render, get the user details
  useEffect(() => {
    getCurrentUser(userEmail, setUser);
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <StyledView>
        {/* If user has items in cart, show the items, otherwise no items displayed */}
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
                  <StyledTextItem>{element.name}</StyledTextItem>
                </StyledItem>
                <StyledItem>
                  <StyledTextItem>${element.price} each</StyledTextItem>
                  <StyledTextItem>{element.quantity} in cart</StyledTextItem>
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