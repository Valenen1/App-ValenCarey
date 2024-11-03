// UserSelectionScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

const UserSelectionScreen = ({ navigation }) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const startScaleAnimation = () => {
    Animated.spring(scaleValue, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };

  const resetScaleAnimation = () => {
    Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true }).start();
  };

  const handleSelection = (userType) => {
    navigation.navigate("Login", { userType });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tu tipo de usuario</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelection("cliente")}
        onPressIn={startScaleAnimation}
        onPressOut={resetScaleAnimation}
      >
        <Animated.Image
          source={require("../assets/cliente.png")}
          style={[styles.buttonImage, { transform: [{ scale: scaleValue }] }]}
        />
        <Text style={styles.buttonText}>Cliente</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelection("proveedor")}
        onPressIn={startScaleAnimation}
        onPressOut={resetScaleAnimation}
      >
        <Animated.Image
          source={require("../assets/proveedor.png")}
          style={[styles.buttonImage, { transform: [{ scale: scaleValue }] }]}
        />
        <Text style={styles.buttonText}>Proveedor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    margin: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  buttonImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  buttonText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default UserSelectionScreen;
