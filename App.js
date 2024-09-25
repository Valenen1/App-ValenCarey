import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "./ThemeContext"; // Importa el ThemeProvider
import HomeScreen from "./screens/HomeScreen";
import AuthScreen from "./screens/AuthScreen";
import ChatScreen from "./screens/ChatScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserSelectionScreen from "./screens/UserSelectionScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      {" "}
      {/* Envuelve tu aplicación en el ThemeProvider */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Seleccion Usuario">
          <Stack.Screen
            name="Seleccion Usuario"
            options={{ headerShown: false }}
            component={UserSelectionScreen}
          />
          <Stack.Screen
            name="Inicio de Sesión"
            options={{ headerShown: false }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="Registro"
            options={{ headerShown: false }}
            component={RegisterScreen}
          />
          <Stack.Screen
            name="OWC Ventures"
            options={{ headerShown: false }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Auth"
            options={{ headerShown: false }}
            component={AuthScreen}
          />
          <Stack.Screen
            name="Chat"
            options={{ headerShown: false }}
            component={ChatScreen}
          />
          <Stack.Screen
            name="Settings"
            options={{ headerShown: false }}
            component={SettingsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
