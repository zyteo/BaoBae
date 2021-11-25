import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import { getCurrentUser, logOutUser } from "../../firebase";
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
  marginRight: 1px;
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

const AccountScreen = ({ navigation, route }) => {
  // save the params as a variable
  const userEmail = route.params.email;
  // react state
  const [user, setUser] = useState([]);

  // function to get the items that user bought in an array
  let boughtItemsArray = [];
  let boughtObjects = user.bought;
  for (const item in boughtObjects) {
    boughtItemsArray.push(boughtObjects[item]);
  }

  // useEffect - upon render, get the user details
  useEffect(() => {
    getCurrentUser(userEmail, setUser);
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <StyledView>
        <StyledText>{user.username}'s Account</StyledText>
        {/* If user has items bought, show the items, otherwise no items displayed */}
        {boughtItemsArray.length > 0 ? (
          <Text>Here's what you bought:</Text>
        ) : (
          <Text>You haven't bought anything.</Text>
        )}
        <StyledViewItems>
          {boughtItemsArray?.map((element, index) => {
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
                  <StyledTextItem>{element.quantity} bought</StyledTextItem>
                  <StyledTextItem>Total ${element.price * element.quantity}</StyledTextItem>
                </StyledItem>
                <StyledTouchableOpacity
                  onPress={() =>
                    navigation.push("Comment", {
                      email: userEmail,
                      item: element.name,
                    })
                  }
                >
                  <StyledTouchableOpacityText>
                    Comment
                  </StyledTouchableOpacityText>
                </StyledTouchableOpacity>
              </StyledHorizontalItems>
            );
          })}
        </StyledViewItems>
        <StyledTouchableOpacity
          onPress={() => navigation.push("Browse", { email: userEmail })}
        >
          <StyledTouchableOpacityText>Back to items</StyledTouchableOpacityText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity onPress={() => logOutUser(navigation)}>
          <StyledTouchableOpacityText>Logout</StyledTouchableOpacityText>
        </StyledTouchableOpacity>
      </StyledView>
    </ScrollView>
  );
};

export default AccountScreen;