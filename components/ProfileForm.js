import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

const ProfileForm = ({ onSubmit, initialName = "", initialPassword = "" }) => {
  const [name, setName] = useState(initialName);
  const [password, setPassword] = useState(initialPassword);

  return (
    <View>
      <TextInput placeholder="Nombre" onChangeText={setName} value={name} />
      <TextInput
        placeholder="Contraseña"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Guardar" onPress={() => onSubmit(name, password)} />
    </View>
  );
};

export default ProfileForm;
