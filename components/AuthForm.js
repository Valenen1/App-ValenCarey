import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const AuthForm = ({ userType, onSwitch }) => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = () => {
    // Aquí iría la lógica para enviar los datos al servidor
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isRegistering
          ? `Regístrate como ${userType}`
          : `Iniciar Sesión como ${userType}`}
      </Text>
      <TextInput placeholder="Correo Electrónico" style={styles.input} />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
      />
      <Button
        title={isRegistering ? "Regístrate" : "Inicia Sesión"}
        color="#1E90FF"
        onPress={handleSubmit}
      />
      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.switchText}>
          {isRegistering
            ? `¿Ya tienes una cuenta? Inicia sesión aquí`
            : `¿No tienes una cuenta? Regístrate aquí`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    backgroundColor: "#F0F8FF",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#1E90FF",
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  switchText: {
    marginTop: 10,
    color: "#8B4513",
  },
});

export default AuthForm;
