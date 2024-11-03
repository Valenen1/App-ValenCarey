// screens/AuthScreen.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const AuthScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Auth Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default AuthScreen;
