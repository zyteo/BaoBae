import React, { useEffect, useState } from "react";
import { Text, TextInput, View, Button, Alert, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { auth, signInUser } from "../../firebase";
import colours from "../Config/colours";

const StyledView = styled.View`
  flex: 1;
  background-color: ${colours.primary};
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StyledTextInput = styled.TextInput`
  height: 35px;
  margin: 16px;
  width: 92%;
  borderWidth: 1.5px;
  borderRadius: 8px;
  padding: 8px;
  background-color: ${colours.inputbox};
  color: ${colours.inputboxtext};
  borderColor: ${colours.border};
  fontSize: 14px;
  `;
  
  const StyledText = styled.Text`
  height: 20px;
  margin: 16px;
  color: ${colours.inputboxtext};
  fontSize: 16px;
  align-items: center;
  justify-content: center;
`;

const StyledTextHeader = styled.Text`
  margin: 2px;
  height: 36px;
  padding: 6px;
  color: ${colours.headerboxtext};
  background-color: ${colours.headerbox};
  fontSize: 18px;
  align-items: center;
  justify-content: center;
  borderRadius: 2px;
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

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect to direct user to browse screen once logged in
  useEffect(() => {
    const directBrowse = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Browse", { email: user.email });
      }
    });
    return directBrowse;
  }, []);

  return (
    <StyledView>
      <StyledTextHeader>Login</StyledTextHeader>
      <StyledText>Email: </StyledText>
      <StyledTextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <StyledText>Password: </StyledText>
      <StyledTextInput
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <StyledTouchableOpacity onPress={() => signInUser(email, password, Alert)}>
        <StyledTouchableOpacityText>LOGIN</StyledTouchableOpacityText>
      </StyledTouchableOpacity>
      <StyledTouchableOpacity onPress={() => navigation.goBack()}>
        <StyledTouchableOpacityText>BACK</StyledTouchableOpacityText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default LoginScreen;