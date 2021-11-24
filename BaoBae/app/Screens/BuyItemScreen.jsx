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
  updateUserBoughtItems,
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
  width: 300px;
  height: 300px;
  borderRadius: 6px;
  margin: 8px;
  `;

const StyledText = styled.Text`
  margin: 8px;
  color: ${colours.inputboxtext};
  fontSize: 16px;
`;

const StyledTextInput = styled.TextInput`
  height: 40px;
  margin: 2px;
  width: 28%;
  borderWidth: 1.5px;
  borderRadius: 8px;
  padding: 8px;
  background-color: ${colours.inputbox};
  color: ${colours.inputboxtext};
  borderColor: ${colours.border};
  fontSize: 14px;
  `;

const BuyItemScreen = ({ route, navigation }) => {
  // save the params as a variable
  const itemName = route.params.name;
  const userEmail = route.params.email;
  // react states
  const [itemSpecific, setItemSpecific] = useState([]);
  const [user, setUser] = useState([]);
  const [buyItemQuantity, setBuyItemQuantity] = useState();

  // handle for user to buy item
  const handleBuyItem = () => {
    // check if quantity is a number
    if (Number.isNaN(parseInt(buyItemQuantity)) == true) {
      Alert.alert("Oops!", "Numbers only!", [{ text: "OK" }]);
      // quantity is a number, but more than 10
    } else if (parseInt(buyItemQuantity) > 10) {
      Alert.alert("CoNsuMeRiSm BaD!", "Y U WAN buy so many? 10 max!!", [
        { text: "YES BOSS" },
      ]);
      // quantity is a number, but less than or equal 0
    } else if (parseInt(buyItemQuantity) <= 0) {
      Alert.alert("Huh?", "You want to buy or not?", [{ text: "INDECISIVE" }]);
      // quantity valid! update user's bought items
    } else {
      updateUserBoughtItems(
        userEmail,
        itemSpecific.name,
        itemSpecific.price,
        parseInt(buyItemQuantity),
        itemSpecific.image,
        Alert
      );

      navigation.push("Browse", {
        email: userEmail,
      });
    }
  };

  // useEffect - upon render, get the item + user details
  useEffect(() => {
    getItemSpecific(itemName, setItemSpecific);
    getCurrentUser(userEmail, setUser);
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <StyledView>
        <StyledText>{itemSpecific.name}</StyledText>
        <StyledImage
          source={{
            uri: itemSpecific.image,
          }}
        />
        <Text>{itemSpecific.description}</Text>
        <Text>Category: {itemSpecific.type}</Text>
        <Text>${itemSpecific.price}</Text>
        <Text>Quantity: {itemSpecific.quantity}</Text>
        <Text>{user.username}, how many items would you like to purchase?</Text>
        <StyledTextInput
          placeholder="How many?"
          onChangeText={(text) => setBuyItemQuantity(text)}
          value={buyItemQuantity}
          keyboardType="numeric"
        />
        <StyledTouchableOpacity onPress={() => handleBuyItem()}>
          <StyledTouchableOpacityText>BUY!</StyledTouchableOpacityText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity onPress={() => navigation.goBack()}>
          <StyledTouchableOpacityText>Back</StyledTouchableOpacityText>
        </StyledTouchableOpacity>
      </StyledView>
    </ScrollView>
  );
};

export default BuyItemScreen;