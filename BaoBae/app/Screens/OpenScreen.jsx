import React from "react";
import styled from "styled-components/native";
import colours from "../Config/colours";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";

const StyledView = styled.View`
  flex: 1;
  background-color: ${colours.primary};
  align-items: center;
  justify-content: center;
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
  width: 250px;
  height: 250px;
  borderRadius: 10px;
  `;

const OpenScreen = ({ navigation }) => {
  return (
    <StyledView>
      <StyledImage source={require('../Config/Logo.png')}/>
      <StyledTouchableOpacity onPress={() => navigation.navigate("Login")} >
        <StyledTouchableOpacityText>Login</StyledTouchableOpacityText>
      </StyledTouchableOpacity>
      <StyledTouchableOpacity onPress={() => navigation.navigate("Signup")} >
        <StyledTouchableOpacityText>Sign Up</StyledTouchableOpacityText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default OpenScreen;
