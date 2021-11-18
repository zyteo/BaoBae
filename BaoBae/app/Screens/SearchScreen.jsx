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
import {
  getCurrentUser,
  getItems,
  logOutUser,
  searchItems,
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

const SearchScreen = ({ route, navigation }) => {
  const userEmail = route.params.email;
  const searchText = route.params.search;
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    searchItems(searchText, setItems);
    getCurrentUser(userEmail, setUser);
  }, []);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text>{user.username}, here's the search results.</Text>
          </View>

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
              title="My Cart"
              onPress={() => navigation.push("Cart", { email: user.email })}
            />
            <Button
              title="All Items"
              onPress={() => navigation.push("Browse", { email: user.email })}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default SearchScreen;
