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
import {
  addComment,
  getCurrentUser,
  getItems,
  getItemSpecific,
  logOutUser,
} from "../../firebase";
import colours from "../Config/colours";

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
const CommentScreen = ({ route, navigation }) => {
  const itemName = route.params.item;
  const userEmail = route.params.email;
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");
  const [itemSpecific, setItemSpecific] = useState([]);
  const [user, setUser] = useState([]);

  // handle for user adding comment
  const handleAddComment = () => {
    // alert if passwords dont match
    if (Number.isNaN(parseInt(rating)) == true) {
      Alert.alert("Oops!", "Rating is number pls", [{ text: "OK" }]);
    } else if (parseInt(rating) > 5) {
      Alert.alert("Sorry boss!", "I know the item very good but max 5 ok", [
        { text: "OK" },
      ]);
    } else if (parseInt(rating) <= 0) {
      Alert.alert("Pls...", "Don't like item but at least give 0 pls", [
        { text: "OK" },
      ]);
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
        `Now the whole world can see what you wrote!`,
        [{ text: "YAY!" }]
      );
      navigation.push("Item", {
        name: itemSpecific.name,
        email: user.email,
      });
    }
  };

  useEffect(() => {
    getItemSpecific(itemName, setItemSpecific);
    getCurrentUser(userEmail, setUser);
  }, []);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text>{itemSpecific.name}</Text>

          <Image
            style={styles.photo}
            source={{
              uri: itemSpecific.image,
            }}
          />
          <Text>{itemSpecific.description}</Text>
          <View>
            <Text>Review</Text>
            <TextInput
              style={styles.input}
              placeholder="Comment for this item you bought..."
              onChangeText={(text) => setText(text)}
              value={text}
            />
            <Text>Rating</Text>
            <TextInput
              style={styles.input}
              placeholder="0 to 5"
              onChangeText={(text) => setRating(text)}
              value={rating}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.container}>
            <Button title="Comment" onPress={() => handleAddComment()} />
            <Button title="Back" onPress={() => navigation.goBack()} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default CommentScreen;
