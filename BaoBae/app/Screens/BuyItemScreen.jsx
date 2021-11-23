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
  updateItemQuantity,
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

const StyledSearchView = styled.View`
  flex: 1;
  background-color: ${colours.primary};
  alignItems: center;
  justifyContent: center;
  width: 80%;
  flexDirection: row;
  margin: 8px;
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
  width: 300px;
  height: 300px;
  borderRadius: 6px;
  margin: 8px;
  `;

const StyledText = styled.Text`
  height: 20px;
  margin: 8px;
  color: ${colours.inputboxtext};
  fontSize: 16px;
`;


const StyledComment = styled.View`
  alignItems: center;
  justifyContent: center;
  margin: 2px;
  background-color: white;
  width: 90%;
  borderRadius: 6px;

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
  const itemName = route.params.name;
  const userEmail = route.params.email;
  const [itemSpecific, setItemSpecific] = useState([]);
  const [user, setUser] = useState([]);
  const [buyItemQuantity, setBuyItemQuantity] = useState();

  // handle for user to buy item
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
        itemSpecific.image,
        Alert
      );

      navigation.push("Browse", {
        email: userEmail,
      });
    }
  };

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
