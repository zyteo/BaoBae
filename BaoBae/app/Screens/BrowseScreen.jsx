import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { logOutUser } from "../../firebase";

const BrowseScreen = ({ navigation }) => {
  const [text, setText] = useState("");

  return (
    <>
      <View>
        <TextInput
          style={{ height: 40 }}
          placeholder="Search items"
          onChangeText={(text) => setText(text)}
        />
      </View>
      <View>
        <Text>Tissue</Text>
        <TouchableOpacity onPress={() => navigation.push("Item")}>
          <Image
            style={styles.photo}
            source={{
              uri: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gh-041420-best-facial-tissue-brands-1586973422.png?crop=0.537xw:0.825xh;0.231xw,0.138xh&resize=640:*",
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 10 }}>
        <Text style={{ padding: 10, fontSize: 42 }}>Browse items!</Text>
        <Button title="Logout" onPress={() => logOutUser(navigation)} />
        <Button title="My Cart" onPress={() => navigation.push("Cart")} />
      </View>
    </>
  );
};

export default BrowseScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  photo: {
    width: 50,
    height: 50,
  },
});
