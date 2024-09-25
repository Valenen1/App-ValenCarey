import React, { useEffect } from "react";
import { View } from "react-native";
import LoadingIndicator from "../components/LoadingIndicator";

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const checkToken = async () => {
      // Simulación de verificación de token guardado en AsyncStorage (puede ser LocalStorage en web)
      const token = await AsyncStorage.getItem("userToken");

      // Si el token existe, navega a la pantalla principal (Home)
      if (token) {
        navigation.replace("Home");
      } else {
        // Si no hay token, navega a la pantalla de inicio de sesión (Login)
        navigation.replace("Login");
      }
    };

    checkToken();
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <LoadingIndicator />
    </View>
  );
};

export default LoadingScreen;
