import { Route } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { getCurrentUser, getItemSpecific } from "../../firebase";
import colours from "../Config/colours";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.primary,
    alignItems: "center",
    justifyContent: "center",
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
    width: 300,
    height: 300,
  },
});

const ItemScreen = ({ route, navigation }) => {
  const itemName = route.params.name;
  const userEmail = route.params.email;
  const [itemSpecific, setItemSpecific] = useState([]);
  const [user, setUser] = useState([]);
  let commentsArray = [];
  let comments = itemSpecific.comments;
  for (const comment in comments) {
    commentsArray.push(comments[comment]);
  }

  useEffect(() => {
    getItemSpecific(itemName, setItemSpecific);
    getCurrentUser(userEmail, setUser);
  }, []);

  return (
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
        <Text>${itemSpecific.price}</Text>
        <Text>Quantity: {itemSpecific.quantity}</Text>

        <Button
          title="Add to cart"
          onPress={() =>
            navigation.push("AddCart", {
              name: itemName,
              email: userEmail,
            })
          }
        />
        <Button
          title="BUY"
          onPress={() =>
            navigation.push("BuyItem", {
              name: itemName,
              email: userEmail,
            })
          }
        />
        <Button
          title="All items"
          onPress={() =>
            navigation.push("Browse", {
              email: userEmail,
            })
          }
        />
        {commentsArray.length > 0 ? (
          <>
            <Text>Comment:</Text>
            {commentsArray?.map((element, index) => {
              return (
                  <View key={index} style={styles.horizontalcontainer}>
                    <Text>{element.username}</Text>
                    <Text>Rating: {element.rating}</Text>
                    <Text>{element.text}</Text>
                  </View>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </View>
    </ScrollView>
  );
};

export default ItemScreen;
