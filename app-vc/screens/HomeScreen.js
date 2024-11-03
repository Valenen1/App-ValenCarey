// screens/HomeScreen.js
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../ThemeContext"; // Importar el contexto de tema

import api from "../services/api";

// Importar las vistas a las que irán los botones
import ChatScreen from "./ChatScreen";
import ProfileScreen from "./ProfileEditScreen";
import SettingsScreen from "./SettingsScreen";
import ProductScreen from "./ProductFormScreen";

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  const { isDarkTheme } = useTheme(); // Obtener el estado del tema

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        navigation.replace("Login");
      } else {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    };

    checkAuth();
  }, [navigation]); // Asegúrate de incluir navigation en las dependencias

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    navigation.replace("Login"); // Cambia a replace si no quieres volver a Home
  };

  return (
    <Tab.Navigator
      initialRouteName="ProductScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "ProductScreen":
              iconName = "home";
              break;
            case "ChatScreen":
              iconName = "chatbubbles";
              break;
            case "SettingsScreen":
              iconName = "settings";
              break;
            case "ProfileScreen":
              iconName = "person";
              break;
            default:
              iconName = "circle";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: isDarkTheme ? "#333" : "#fff", // Cambia el fondo del tab bar según el tema
        },
        tabBarActiveTintColor: "#007BFF",
        tabBarInactiveTintColor: "gray",
        headerRight: () => (
          <Button onPress={handleLogout} title="Logout" color="#f4511e" />
        ), // Agregar el botón de logout en el encabezado
      })}
    >
      <Tab.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{
          title: "Inicio",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          title: "Chats",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: "Ajustes",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Perfil",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
