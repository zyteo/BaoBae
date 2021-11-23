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
import {
  getCurrentUser,
  getItems,
  logOutUser,
  searchItems,
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

const SearchScreen = ({ route, navigation }) => {
  const userEmail = route.params.email;
  const searchText = route.params.search;
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    searchItems(searchText, setItems);
    getCurrentUser(userEmail, setUser);
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StyledView>
          <StyledText>{user.username}, here's the search results.</StyledText>

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
            <StyledTouchableOpacity onPress={() => logOutUser(navigation)}>
              <StyledTouchableOpacityText>Logout</StyledTouchableOpacityText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity
              onPress={() => navigation.push("Cart", { email: user.email })}
            >
              <StyledTouchableOpacityText>Cart 🛒</StyledTouchableOpacityText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity
              onPress={() => navigation.push("Browse", { email: user.email })}
            >
              <StyledTouchableOpacityText>All Items</StyledTouchableOpacityText>
            </StyledTouchableOpacity>
          </StyledSearchView>
        </StyledView>
      </ScrollView>
    </>
  );
};

export default SearchScreen;
