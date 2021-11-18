import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import styled from "styled-components/native";
import { auth, signUpUser } from "../../firebase";
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

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  // handle for user sign up
  const handleSignUp = () => {
    // alert if passwords dont match
    if (password !== passwordCheck) {
      Alert.alert("Oops!", "Passwords do not match!", [{ text: "OK" }]);
    } else if (password.length < 6 || passwordCheck.length < 6) {
      Alert.alert("Oops!", "Password must be at least 6 characters!", [
        { text: "OK" },
      ]);
    } else if (username.length < 3) {
      Alert.alert("Oops!", "Username must be at least 3 characters!", [
        { text: "OK" },
      ]);
    } else {
      signUpUser(email, password, username, Alert);
      const directBrowse = auth.onAuthStateChanged((user) => {
        if (user) {
          navigation.navigate("Browse", { email: user.email });
        }
        return directBrowse;
      });
    }
  };

  return (
    <ScrollView>
      <StyledView>
      <StyledTextHeader>Create Account</StyledTextHeader>
        <StyledText>Email: </StyledText>
        <StyledTextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <StyledText>Username: </StyledText>
        <StyledTextInput
          placeholder="Username - Minimum 3 characters"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <StyledText>Password: </StyledText>
        <StyledTextInput
          secureTextEntry={true}
          placeholder="Password - Minimum 6 characters"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <StyledText>Confirm Password: </StyledText>
        <StyledTextInput
          secureTextEntry={true}
          placeholder="Confirm Password"
          onChangeText={(text) => setPasswordCheck(text)}
          value={passwordCheck}
        />
        <StyledTouchableOpacity onPress={() => handleSignUp()} >
          <StyledTouchableOpacityText>Sign Up</StyledTouchableOpacityText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity onPress={() => navigation.goBack()} >
          <StyledTouchableOpacityText>Back</StyledTouchableOpacityText>
        </StyledTouchableOpacity>
      </StyledView>
    </ScrollView>
  );
};

export default SignupScreen;
