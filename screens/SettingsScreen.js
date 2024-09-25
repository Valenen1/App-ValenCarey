// screens/SettingsScreen.js
import React from "react";
import { View, Text, Button, StyleSheet, Switch } from "react-native";
import { useTheme } from "../ThemeContext"; // Importa el contexto del tema

const SettingsScreen = ({ navigation }) => {
  const { isDarkTheme, toggleTheme } = useTheme(); // Usa el contexto para obtener el estado y la función de cambio de tema

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? "#333" : "#fff" },
      ]}
    >
      {/* Agregar el interruptor para cambiar el tema */}
      <View style={styles.switchContainer}>
        <Text style={{ color: isDarkTheme ? "#fff" : "#000" }}>
          Modo Oscuro
        </Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>

      {/* Agrega más elementos de UI según las necesidades de tu pantalla de ajustes */}
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
  switchContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%", // Asegura que el interruptor y el texto estén alineados correctamente
  },
});

export default SettingsScreen;
