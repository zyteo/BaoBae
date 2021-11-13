import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colours from "./app/Config/colours";

import PizzaTranslator from "./app/Screens/Test";
import AccountScreen from "./app/Screens/AccountScreen";
import BrowseScreen from "./app/Screens/BrowseScreen";
import CartScreen from "./app/Screens/CartScreen";
import ItemScreen from "./app/Screens/ItemScreen";
import LoginScreen from "./app/Screens/LoginScreen";
import OpenScreen from "./app/Screens/OpenScreen";
import SearchScreen from "./app/Screens/SearchScreen";
import SignupScreen from "./app/Screens/SearchScreen";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>BaoBae</Text>
      <Text>Taobao Clone</Text>
      <StatusBar style="auto" />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Test")}
      />
      <Button
        title="Go to a"
        onPress={() => navigation.navigate("Account")}
      />
      <Button
        title="Go to b"
        onPress={() => navigation.navigate("Browse")}
      />
      <Button
        title="Go to c"
        onPress={() => navigation.navigate("Cart")}
      />
    </View>
  );
}

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Overview" }}
          />
          <Stack.Screen name="Test" component={PizzaTranslator} />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="Browse" component={BrowseScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Item" component={ItemScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
