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
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StyledSearchView = styled.View`
  flex: 1;
  background-color: ${colours.primary};
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StyledTextInput = styled.TextInput`
  height: 35px;
  margin: 2px;
  width: %;
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
  width: 80px;
  height: 80px;
  borderRadius: 6px;
  `;

const StyledText = styled.Text`
  height: 20px;
  margin: 16px;
  color: ${colours.inputboxtext};
  fontSize: 16px;
  align-items: center;
  justify-content: center;
`;

const StyledViewItems = styled.View`
  flex: 1;
  background-color: ${colours.primary};
  align-items: center;
  justify-content: center;
  width: 100%;
  flexDirection: row;
  flexWrap: wrap;
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
                <View key={index}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push("Item", {
                        name: element.name,
                        email: user.email,
                      })
                    }
                  >
                    <Text>{element.name}</Text>
                    <StyledImage
                      source={{
                        uri: element.image,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </StyledViewItems>

          <View>
            <StyledTouchableOpacity onPress={() => logOutUser(navigation)}>
              <StyledTouchableOpacityText>Logout</StyledTouchableOpacityText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity
              onPress={() => navigation.push("Cart", { email: user.email })}
            >
              <StyledTouchableOpacityText>🛒</StyledTouchableOpacityText>
            </StyledTouchableOpacity>
          </View>
        </StyledView>
      </ScrollView>
  );
};

export default BrowseScreen;
