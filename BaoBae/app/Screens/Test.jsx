import React, { useState } from "react";
import { Text, TextInput, View, Button } from "react-native";

const PizzaTranslator = ({ navigation }) => {
  const [text, setText] = useState("");
  return (
    <View style={{ padding: 10 }}>
      <TextInput
        style={{ height: 40 }}
        placeholder="Type here to translate!"
        onChangeText={(text) => setText(text)}
        defaultValue={text}
      />
      <Text style={{ padding: 10, fontSize: 42 }}>
        {text
          .split(" ")
          .map((word) => word && "🍕")
          .join(" ")}
      </Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("Test")}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default PizzaTranslator;
