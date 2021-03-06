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
  Alert,
} from "react-native";
import styled from "styled-components/native";
import {
  addComment,
  getCurrentUser,
  getItemSpecific,
} from "../../firebase";
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
  width: 150px;
  height: 150px;
  borderRadius: 6px;
  margin: 8px;
  `;

const StyledText = styled.Text`
  height: 20px;
  margin: 8px;
  color: ${colours.inputboxtext};
  fontSize: 16px;
`;


const StyledReviewInput = styled.TextInput`
  height: 40px;
  margin: 2px;
  width: 80%;
  borderWidth: 1.5px;
  borderRadius: 8px;
  padding: 8px;
  background-color: ${colours.inputbox};
  color: ${colours.inputboxtext};
  borderColor: ${colours.border};
  fontSize: 14px;
  `;

const StyledRatingInput = styled.TextInput`
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

const CommentScreen = ({ route, navigation }) => {
  // save the params as a variable
  const itemName = route.params.item;
  const userEmail = route.params.email;
  // react states
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");
  const [itemSpecific, setItemSpecific] = useState([]);
  const [user, setUser] = useState([]);

  // handle for user adding comment
  const handleAddComment = () => {
    // check if rating is a number
    if (Number.isNaN(parseInt(rating)) == true) {
      Alert.alert("Oops!", "Rating must be a number", [{ text: "OK" }]);
      // rating is a number, but more than 5
    } else if (parseInt(rating) > 5) {
      Alert.alert("Sorry!", "Maximum of 5!", [
        { text: "OK" },
      ]);
      // rating is a number, but less than or equal 0
    } else if (parseInt(rating) <= 0) {
      Alert.alert("Sorry!", "Minimum of 1!", [
        { text: "OK" },
      ]);
      // rating valid! add the comment
    } else {
      addComment(
        itemSpecific.name,
        userEmail,
        user.username,
        parseInt(rating),
        text
      );
      Alert.alert(
        "Comment added!",
        `Now everyone can see your comment!`,
        [{ text: "OK" }]
      );
      navigation.push("Item", {
        name: itemSpecific.name,
        email: user.email,
      });
    }
  };

  // useEffect - upon render, get the item + user details
  useEffect(() => {
    getItemSpecific(itemName, setItemSpecific);
    getCurrentUser(userEmail, setUser);
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StyledView>
          <StyledText>{itemSpecific.name}</StyledText>

          <StyledImage
            source={{
              uri: itemSpecific.image,
            }}
          />
          <Text>{itemSpecific.description}</Text>
          <StyledText>Review</StyledText>
          <StyledReviewInput
            placeholder="How's the item?"
            onChangeText={(text) => setText(text)}
            value={text}
          />
          <StyledText>Rating</StyledText>
          <StyledRatingInput
            placeholder="1 to 5"
            onChangeText={(text) => setRating(text)}
            value={rating}
            keyboardType="numeric"
          />

          <StyledTouchableOpacity
            title="Comment"
            onPress={() => handleAddComment()}
          >
            <StyledTouchableOpacityText>Comment</StyledTouchableOpacityText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity
            title="Back"
            onPress={() => navigation.goBack()}
          >
            <StyledTouchableOpacityText>Back</StyledTouchableOpacityText>
          </StyledTouchableOpacity>
        </StyledView>
      </ScrollView>
    </>
  );
};

export default CommentScreen;