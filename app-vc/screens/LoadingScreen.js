// LoadingScreen.js
import React, { useEffect } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingIndicator from "../components/LoadingIndicator";

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("userToken");
      navigation.replace(token ? "Home" : "Login");
    };
    checkToken();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <LoadingIndicator />
    </View>
  );
};

export default LoadingScreen;
