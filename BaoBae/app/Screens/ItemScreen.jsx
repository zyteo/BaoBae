import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import { getItemSpecific } from "../../firebase";
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


const StyledComment = styled.View`
  alignItems: center;
  justifyContent: center;
  margin: 2px;
  background-color: white;
  width: 90%;
  borderRadius: 6px;

`;

const ItemScreen = ({ route, navigation }) => {
  // save the params as a variable
  const itemName = route.params.name;
  const userEmail = route.params.email;
  // react state
  const [itemSpecific, setItemSpecific] = useState([]);
  
  // function to get the comments for the item in an array
  let commentsArray = [];
  let comments = itemSpecific.comments;
  for (const comment in comments) {
    commentsArray.push(comments[comment]);
  }

  // useEffect - upon render, get the item details
  useEffect(() => {
    getItemSpecific(itemName, setItemSpecific);
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
        <Text>Quantity: {(itemSpecific.quantity > 0) ? itemSpecific.quantity : `SOLD OUT!`}</Text>

        <StyledSearchView>
          <StyledTouchableOpacity
            onPress={() =>
              navigation.push("AddCart", {
                name: itemName,
                email: userEmail,
              })
            }
          >
            <StyledTouchableOpacityText>Add to 🛒</StyledTouchableOpacityText>
          </StyledTouchableOpacity>
          {(itemSpecific.quantity > 0) ? <StyledTouchableOpacity
            onPress={() =>
              navigation.push("BuyItem", {
                name: itemName,
                email: userEmail,
              })
            }
          >
            <StyledTouchableOpacityText>Buy</StyledTouchableOpacityText>
          </StyledTouchableOpacity> : <></>}

          <StyledTouchableOpacity
            onPress={() => navigation.push("Browse", { email: userEmail })}
          >
            <StyledTouchableOpacityText>All Items</StyledTouchableOpacityText>
          </StyledTouchableOpacity>
        </StyledSearchView>
        {commentsArray.length > 0 ? (
          <>
            <StyledText>Review</StyledText>
            {commentsArray?.map((element, index) => {
              return (
                <StyledComment key={index}>
                  <Text>User: {element.username}</Text>
                  <Text>Rating: {"⭐".repeat(parseInt(element.rating))}</Text>
                  <Text>{element.text}</Text>
                </StyledComment>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </StyledView>
    </ScrollView>
  );
};

export default ItemScreen;