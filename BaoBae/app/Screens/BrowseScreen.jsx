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
  width: 80%;
  flexDirection: row;
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  items: {
    flex: 1,
    backgroundColor: colours.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    width: "90%",
    backgroundColor: colours.inputbox,
    color: colours.inputboxtext,
    borderColor: colours.border,
  },
  photo: {
    width: 80,
    height: 80,
  },
});

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
          <Text>What are you looking for today, {user.username}?</Text>
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

          <View style={styles.items}>
            {items.map((element, index) => {
              return (
                <View key={index}>
                  <Text>{element.name}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push("Item", {
                        name: element.name,
                        email: user.email,
                      })
                    }
                  >
                    <Image
                      style={styles.photo}
                      source={{
                        uri: element.image,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          <View style={styles.container}>
            <Button title="Logout" onPress={() => logOutUser(navigation)} />
            <Button
              title="My 🛒"
              onPress={() => navigation.push("Cart", { email: user.email })}
            />
          </View>
        </StyledView>
      </ScrollView>
    </>
  );
};

export default BrowseScreen;
