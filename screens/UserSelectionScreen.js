import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";

const UserSelectionScreen = ({ navigation }) => {
  const [scaleValue] = useState(new Animated.Value(1)); // Valor inicial de escala

  // Función para iniciar la animación de escala
  const startScaleAnimation = (toValue) => {
    Animated.timing(scaleValue, {
      toValue, // Escalar a este valor
      duration: 200, // Duración de la animación
      useNativeDriver: true,
    }).start();
  };

  const handleSelection = (userType) => {
    navigation.navigate("Inicio de Sesión", { userType });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tu tipo de usuario</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelection("cliente")}
        onMouseEnter={() => startScaleAnimation(1.1)} // Escalar al pasar el cursor
        onMouseLeave={() => startScaleAnimation(1)} // Volver a la escala normal
      >
        <Animated.Image
          source={require("../assets/cliente.png")} // Ruta a la imagen del cliente
          style={[styles.buttonImage, { transform: [{ scale: scaleValue }] }]} // Aplica la escala animada
        />
        <Text style={styles.buttonText}>Cliente</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelection("proveedor")}
        onMouseEnter={() => startScaleAnimation(1.1)} // Escalar al pasar el cursor
        onMouseLeave={() => startScaleAnimation(1)} // Volver a la escala normal
      >
        <Animated.Image
          source={require("../assets/proveedor.png")} // Ruta a la imagen del proveedor
          style={[styles.buttonImage, { transform: [{ scale: scaleValue }] }]} // Aplica la escala animada
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
    overflow: "hidden", // Bordes redondeados si el TouchableOpacity tiene borderRadius
  },
  buttonImage: {
    width: 150, // Ancho de la imagen
    height: 150, // Alto de la imagen
    resizeMode: "contain", // Ajuste de la imagen (cover, contain, etc.)
  },
  buttonText: {
    marginTop: 10, // Espacio entre la imagen y el texto
    fontSize: 16,
    color: "#333", // Color del texto
  },
});

export default UserSelectionScreen;
