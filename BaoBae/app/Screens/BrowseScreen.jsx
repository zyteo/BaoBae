import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getItems, logOutUser } from "../../firebase";
import colours from "../Config/colours";

const BrowseScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems(setItems);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text>What are you looking for today?</Text>
          <TextInput
            style={styles.input}
            placeholder="Search items"
            onChangeText={(text) => setText(text)}
          />
          <Button title="🔍" onPress={() => logOutUser(navigation)} />
        </View>

        <View style={styles.items}>
          {items.map((element) => {
            return (
              <>
                <View>
                  <Text>{element.name}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push("Item", { name: element.name })
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
              </>
            );
          })}
        </View>

        <View style={styles.container}>
          <Button title="Logout" onPress={() => logOutUser(navigation)} />
          <Button title="My Cart" onPress={() => navigation.push("Cart")} />
        </View>
      </View>
    </>
  );
};

export default BrowseScreen;

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
    backgroundColor: colours.inputbox,
    color: colours.inputboxtext,
    borderColor: colours.border,
  },
  photo: {
    width: 80,
    height: 80,
  },
});
