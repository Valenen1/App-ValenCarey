import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "./ThemeContext";
import HomeScreen from "./screens/HomeScreen";
import AuthScreen from "./screens/AuthScreen";
import ChatScreen from "./screens/ChatScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserSelectionScreen from "./screens/UserSelectionScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token); // Cambia el estado basado en la existencia del token
    };

    checkAuthentication();
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isAuthenticated ? "Home" : "UserSelection"}
        >
          <Stack.Screen
            name="UserSelection"
            component={UserSelectionScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          {/* Additional screens for navigation */}
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
