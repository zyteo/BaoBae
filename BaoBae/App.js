import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { LogBox } from "react-native";
import colours from "./app/Config/colours";
import AccountScreen from "./app/Screens/AccountScreen";
import AddCartScreen from "./app/Screens/AddCartScreen";
import BrowseScreen from "./app/Screens/BrowseScreen";
import BuyItemScreen from "./app/Screens/BuyItemScreen";
import CartScreen from "./app/Screens/CartScreen";
import CommentScreen from "./app/Screens/CommentScreen";
import ItemScreen from "./app/Screens/ItemScreen";
import LoginScreen from "./app/Screens/LoginScreen";
import OpenScreen from "./app/Screens/OpenScreen";
import SearchScreen from "./app/Screens/SearchScreen";
import SignupScreen from "./app/Screens/SignupScreen";
LogBox.ignoreLogs(["Setting a timer"]);
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colours.border,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerBackVisible: false,
          }}
        >
          <Stack.Screen
            name="Home"
            component={OpenScreen}
            options={{ title: "Overview" }}
          />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="Comment" component={CommentScreen} />
          <Stack.Screen name="Browse" component={BrowseScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Item" component={ItemScreen} />
          <Stack.Screen name="AddCart" component={AddCartScreen} />
          <Stack.Screen name="BuyItem" component={BuyItemScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
