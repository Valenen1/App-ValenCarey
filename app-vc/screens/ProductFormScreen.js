// screens/ProductFormScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useTheme } from "../ThemeContext"; // Importar el contexto de tema

const ProductFormScreen = ({ route, navigation }) => {
  const { isDarkTheme } = useTheme(); // Obtener el estado del tema
  const [name, setName] = useState(route.params ? route.params.name : "");

  const handleSubmit = () => {
    // Lógica para guardar el producto/servicio
    navigation.goBack(); // Vuelve a la pantalla anterior
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? "#333" : "#fff" },
      ]}
    >
      <TextInput
        style={[styles.input, { color: isDarkTheme ? "#fff" : "#000" }]}
        placeholder="Nombre del servicio/producto"
        placeholderTextColor={isDarkTheme ? "#bbb" : "#666"}
        onChangeText={setName}
        value={name}
      />
      <Button title="Publicar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 16,
  },
});

export default ProductFormScreen;
