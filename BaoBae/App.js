import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PizzaTranslator from "./app/Screens/Test";
export default function App() {
  return (
    <>
      <View style={styles.container}>
        <Text>BaoBae</Text>
        <Text>Taobao Clone</Text>
        <StatusBar style="auto" />
      </View>
      <PizzaTranslator />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
});
