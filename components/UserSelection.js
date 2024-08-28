import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const UserSelection = ({ onSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tu tipo de usuario</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onSelect("Proveedor")}
      >
        <Icon name="cogs" size={30} color="#8B4513" />
        <Text style={styles.buttonText}>Soy Proveedor</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onSelect("Cliente")}
      >
        <Icon name="user" size={30} color="#1E90FF" />
        <Text style={styles.buttonText}>Soy Cliente</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F8FF",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#1E90FF",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8DC",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "80%",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 10,
    color: "#333",
  },
});

export default UserSelection;
