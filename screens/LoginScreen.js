import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from "react-native";

// Obtener las dimensiones de la pantalla
const { width, height } = Dimensions.get("window");

// Función para escalar valores según la densidad de píxeles
const scale = (size) => size * PixelRatio.getFontScale();

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
      navigation.navigate("OWC Ventures");
    } else {
      alert("Por favor, ingresa usuario y contraseña");
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

          <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
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
