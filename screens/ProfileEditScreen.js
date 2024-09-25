// screens/ProfileEditScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useTheme } from "../ThemeContext"; // Importar el contexto de tema
import { Text, Dimensions, PixelRatio } from "react-native";

const scale = (size) => size * PixelRatio.getFontScale();

const { width, height } = Dimensions.get("window");

const ProfileEditScreen = ({ navigation }) => {
  const { isDarkTheme } = useTheme(); // Obtener el estado del tema

  const handleSave = () => {
    // Lógica para guardar los cambios de perfil
    navigation.goBack();
  };

  const handleDeleteAccount = () => {
    // Lógica para eliminar la cuenta del usuario
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? "#333" : "#fff" },
      ]}
    >
      <Text style={styles.title}>Nombre Usuario: </Text>

      <Text style={styles.title}>DNI: </Text>

      <Button title="Guardar" onPress={handleSave} />
      <Button
        title="Eliminar cuenta"
        color="red"
        onPress={handleDeleteAccount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: scale(24), // Escala el texto según la densidad de la pantalla
    color: "white",
    textAlign: "center",
    marginBottom: height * 0.02, // Usar porcentaje del alto para el margen
  },
});

export default ProfileEditScreen;
