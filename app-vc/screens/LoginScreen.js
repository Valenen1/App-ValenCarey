import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Button,
  Alert,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../services/api";

// Obtener las dimensiones de la pantalla
const { width, height } = Dimensions.get("window");

// Función para escalar valores según la densidad de píxeles
const scale = (size) => size * PixelRatio.getFontScale();

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Si el login es exitoso, redirige a otra pantalla
        await AsyncStorage.setItem("userToken", data.token);
        console.log("Token guardado:", data.token);
        navigation.navigate("Home"); // O donde necesites redirigir
      } else {
        // Si hay un error, muestra el mensaje
        Alert.alert("Error", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Error de conexión al servidor");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/app-wallpaper.png")} // Ruta de tu imagen de fondo
        style={styles.background}
        resizeMode="cover" // Ajustar la imagen de fondo a la pantalla
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Ingresar Datos:</Text>

          <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.linkText}>
              ¿No tienes una cuenta? Regístrate
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%", // Asegura que la imagen cubra el ancho completo de la pantalla
    height: "100%", // Asegura que la imagen cubra el alto completo de la pantalla
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: width * 0.05, // Usar porcentaje del ancho para el padding
  },
  title: {
    fontSize: scale(24), // Escala el texto según la densidad de la pantalla
    color: "white",
    textAlign: "center",
    marginBottom: height * 0.02, // Usar porcentaje del alto para el margen
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Fondo blanco semi-transparente para los inputs
    padding: height * 0.015, // Padding basado en porcentaje del alto
    borderRadius: 5,
    fontSize: scale(16), // Escalar el tamaño de la fuente
    marginBottom: height * 0.02, // Usar porcentaje del alto para el margen
    width: "100%", // Asegurar que el input ocupe el ancho disponible
  },
  button: {
    backgroundColor: "#007BFF",
    padding: height * 0.02, // Padding basado en porcentaje del alto
    borderRadius: 5,
    alignItems: "center",
    marginVertical: height * 0.055, // Usar porcentaje del alto para el margen vertical
    width: "100%", // Asegurar que el botón ocupe el ancho disponible
    opacity: "80%",
  },
  buttonText: {
    color: "white",
    fontSize: scale(16), // Escalar el tamaño de la fuente
  },
  linkText: {
    color: "#007BFF",
    textAlign: "center",
    marginTop: height * 0.02, // Usar porcentaje del alto para el margen
    fontSize: scale(16), // Escalar el tamaño de la fuente
  },
});

export default LoginScreen;
