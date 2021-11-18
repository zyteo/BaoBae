import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import { getCurrentUser, getItems, logOutUser } from "../../firebase";
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

const StyledTextInput = styled.TextInput`
  height: 40px;
  margin: 2px;
  width: 95%;
  borderWidth: 1.5px;
  borderRadius: 8px;
  padding: 8px;
  background-color: ${colours.inputbox};
  color: ${colours.inputboxtext};
  borderColor: ${colours.border};
  fontSize: 14px;
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

const StyledSearch = styled(StyledTouchableOpacity)`
  height: 40px;
`;

const StyledTouchableOpacityText = styled.Text`
  color: ${colours.buttonboxtext};
  fontSize: 17px;
  `;

const StyledImage = styled.Image`
  width: 90px;
  height: 90px;
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
  flexDirection: row;
  flexWrap: wrap;
`;

const StyledItem = styled.View`
  alignItems: center;
  justifyContent: center;
  margin: 8px;
  width: 100px;
  height: 118px;
`;

const BrowseScreen = ({ route, navigation }) => {
  const userEmail = route.params.email;
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    getItems(setItems);
    getCurrentUser(userEmail, setUser);
  }, []);

  return (
    <>
      <ScrollView>
        <StyledView>
          <StyledText>
            What are you looking for today, {user.username}?
          </StyledText>
          <StyledSearchView>
            <StyledTextInput
              placeholder="Search items"
              onChangeText={(text) => setText(text)}
            />
            <StyledSearch
              onPress={() =>
                navigation.push("Search", {
                  email: user.email,
                  search: text,
                })
              }
            >
              <StyledTouchableOpacityText>🔍</StyledTouchableOpacityText>
            </StyledSearch>
          </StyledSearchView>

          <StyledViewItems>
            {items.map((element, index) => {
              return (
                <StyledItem key={index}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push("Item", {
                        name: element.name,
                        email: user.email,
                      })
                    }
                  >
                    <StyledImage
                      source={{
                        uri: element.image,
                      }}
                    />
                    <Text>{element.name}</Text>
                  </TouchableOpacity>
                </StyledItem>
              );
            })}
          </StyledViewItems>

          <StyledSearchView>
            <StyledTouchableOpacity
              onPress={() => navigation.push("Cart", { email: user.email })}
            >
              <StyledTouchableOpacityText>Cart 🛒</StyledTouchableOpacityText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity onPress={() => logOutUser(navigation)}>
              <StyledTouchableOpacityText>Logout</StyledTouchableOpacityText>
            </StyledTouchableOpacity>
          </StyledSearchView>
        </StyledView>
      </ScrollView>
    </>
  );
};

export default BrowseScreen;
