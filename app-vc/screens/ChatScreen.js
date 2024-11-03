import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useTheme } from "../ThemeContext"; // Importar el contexto de tema

const ChatScreen = () => {
  const { isDarkTheme } = useTheme(); // Obtener el estado del tema
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim() === "") return; // No enviar mensajes vacíos
    setMessages([...messages, { id: messages.length + 1, text: message }]);
    setMessage(""); // Limpiar el campo de entrada
    Keyboard.dismiss(); // Ocultar el teclado después de enviar el mensaje
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? "#333" : "#fff" },
      ]}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={{ color: isDarkTheme ? "#fff" : "#000" }}>
            {item.text}
          </Text>
        )}
      />
      <TextInput
        style={[styles.input, { color: isDarkTheme ? "#fff" : "#000" }]}
        placeholder="Escribe tu mensaje..."
        placeholderTextColor={isDarkTheme ? "#bbb" : "#666"}
        value={message}
        onChangeText={setMessage}
        onSubmitEditing={sendMessage} // Enviar el mensaje al presionar Enter
        returnKeyType="send" // Cambia la tecla Enter del teclado a "Enviar"
      />
      <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
        <Text style={styles.sendButtonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 16,
    padding: 8,
  },
  sendButton: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 8,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ChatScreen;
