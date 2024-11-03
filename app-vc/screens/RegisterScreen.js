import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Button,
  Dimensions,
  PixelRatio,
  Alert,
} from "react-native";

import api from "../services/api";

// Obtener las dimensiones de la pantalla
const { width, height } = Dimensions.get("window");

// Función para escalar valores según la densidad de píxeles
const scale = (size) => size * PixelRatio.getFontScale();

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [dni, setDni] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await api.post("/register", {
        username,
        dni,
        role,
        password,
      });
      console.log("Registration successful:", response.data);
      Alert.alert("Success", "Account created successfully", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error) {
      console.log("Registration error:", error.response?.data);
      Alert.alert(
        "Registration failed",
        error.response?.data?.error || "An unexpected error occurred"
      );
    }
  };

  // if (!username || !password || !dni) {
  //   Alert.alert("Error", "Por favor, ingresa usuario, dni y contraseña.");
  // } else {
  //   navigation.navigate("ProductScreen");
  // }

  const handleLogin = () => {
    navigation.navigate("Login"); // Redirige a la pantalla de login
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/app-wallpaper.png")} // Ruta de tu imagen de fondo
        style={styles.background}
        resizeMode="cover"
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
            placeholder="DNI"
            value={dni}
            onChangeText={(text) => {
              const filteredText = text.replace(/[^0-9]/g, "");
              setDni(filteredText);
            }}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Rol"
            value={role}
            onChangeText={setRole}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.linkText}>¿Ya tienes una cuenta? Logeate</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: width * 0.05,
  },
  title: {
    fontSize: scale(24),
    color: "white",
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: height * 0.015,
    borderRadius: 5,
    fontSize: scale(16),
    marginBottom: height * 0.02,
    width: "100%",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: height * 0.02,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: height * 0.055,
    width: "100%",
    opacity: "80%",
  },
  buttonText: {
    color: "white",
    fontSize: scale(16),
  },
  linkText: {
    color: "#007BFF",
    textAlign: "center",
    marginTop: height * 0.02,
    fontSize: scale(16),
  },
});

export default RegisterScreen;
