// screens/HomeScreen.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../ThemeContext"; // Importar el contexto de tema

// Importar las vistas a las que irán los botones
import ChatScreen from "./ChatScreen";
import ProfileScreen from "./ProfileEditScreen";
import SettingsScreen from "./SettingsScreen";
import ProductScreen from "./ProductFormScreen";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const { isDarkTheme } = useTheme(); // Obtener el estado del tema

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
