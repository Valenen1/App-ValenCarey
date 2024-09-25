import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

const AuthForm = ({ onSubmit, formType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button
        title={formType === "login" ? "Login" : "Register"}
        onPress={() => onSubmit(email, password)}
      />
    </View>
  );
};

export default AuthForm;
