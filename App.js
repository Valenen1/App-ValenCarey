import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import UserSelection from "./components/UserSelection";
import AuthForm from "./components/AuthForm";
import LoadingScreen from "./components/LoadingScreen"; // Importa la pantalla de carga

const App = () => {
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Estado para la pantalla de carga

  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Cambia este tiempo según tus necesidades
  }, []);

  const handleSelectUserType = (type) => {
    setUserType(type);
  };

  if (isLoading) {
    return <LoadingScreen />; // Muestra la pantalla de carga si isLoading es true
  }

  return (
    <View style={styles.container}>
      {userType ? (
        <AuthForm userType={userType} onSwitch={() => setUserType(null)} />
      ) : (
        <UserSelection onSelect={handleSelectUserType} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
