import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../ThemeContext";

import api from "../services/api";
const ProductFormScreen = ({ route, navigation }) => {
  const { isDarkTheme, toggleTheme } = useTheme();

  const [serviceName, setServiceName] = useState(
    route.params?.serviceName || ""
  );
  const [description, setDescription] = useState(
    route.params?.description || ""
  );
  const [availability, setAvailability] = useState(
    route.params?.availability || ""
  );
  const [isEditMode, setIsEditMode] = useState(!!route.params?.id);
  const [products, setProducts] = useState([]);
  const [formVisible, setFormVisible] = useState(true); // Estado para controlar la visibilidad del formulario
  const [userDni, setUserDni] = useState(null); // Inicializa el estado para userDni

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      console.log(response.data); // Imprime los datos en la consola para verificar la respuesta
      setProducts(response.data); // Establece los productos en el estado
    } catch (error) {
      console.error("Error fetching products:", error);
      Alert.alert("Error", "Could not fetch products.");
    }
  };

  const decodeJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

  const fetchUserDni = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        const decodedToken = decodeJwt(token);
        if (decodedToken && decodedToken.dni) {
          setUserDni(decodedToken.dni);
        } else {
          Alert.alert("Error", "User DNI not found in the token.");
        }
      }
    } catch (error) {
      console.error("Error fetching user DNI:", error);
      Alert.alert(
        "Error",
        "An error occurred while fetching user information."
      );
    }
  };

  useEffect(() => {
    const initializeUser = async () => {
      await fetchUserDni();
      await fetchProducts();
    };

    initializeUser();
  }, []);

  const [selectedProductId, setSelectedProductId] = useState(null);

  const resetForm = () => {
    setServiceName("");
    setDescription("");
    setAvailability("");
    setIsEditMode(false);
    setSelectedProductId(null); // Restablece la ID seleccionada
    setFormVisible(false); // Opcional: Oculta el formulario después de la acción
  };

  const handleEdit = (item) => {
    setServiceName(item.service_name);
    setDescription(item.description);
    setAvailability(item.availability);
    setIsEditMode(true);
    setFormVisible(true);
    setSelectedProductId(item.id); // Establece la ID del producto que se está editando
  };

  const handleSubmit = async () => {
    const productId = selectedProductId; // Obtén la ID del producto desde el estado
    if (isEditMode && !productId) {
      Alert.alert("Error", "Product ID is required for updating.");
      return;
    }

    try {
      if (isEditMode) {
        // Update product
        await api.put(`/products/${productId}`, {
          serviceName,
          description,
          availability,
        });
        Alert.alert("Success", "Product updated successfully");
      } else {
        // Create new product
        await api.post("/products", {
          serviceName,
          description,
          availability,
        });
        Alert.alert("Success", "Product created successfully");
      }
      fetchProducts(); // Refresh the product list
      resetForm(); // Opcional: restablece el formulario después de la acción
    } catch (error) {
      console.log("Error:", error.response?.data);
      Alert.alert("Error", error.response?.data?.error || "An error occurred");
    }
  };

  const handleDelete = async (productId, productDni) => {
    if (productDni !== userDni) {
      Alert.alert("Error", "You can only delete your own products.");
      return;
    }

    try {
      await api.delete(`/products/${productId}`);
      Alert.alert("Success", "Product deleted successfully");
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.log("Error:", error.response?.data);
      Alert.alert("Error", error.response?.data?.error || "An error occurred");
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View
        key={item.id}
        style={[
          styles.productCard,
          { backgroundColor: isDarkTheme ? "#333" : "#fff" },
        ]}
      >
        <Text
          style={[
            styles.productTitle,
            {
              backgroundColor: isDarkTheme ? "#333" : "#fff",
              color: isDarkTheme ? "#fff" : "#000",
            },
          ]}
        >
          {item.service_name}
        </Text>
        <Text style={{ color: isDarkTheme ? "#fff" : "#000" }}>
          {item.description}
        </Text>
        <Text style={{ color: isDarkTheme ? "#fff" : "#000" }}>
          {item.availability}
        </Text>
        <Text style={{ color: isDarkTheme ? "#fff" : "#000" }}>
          Published by: {item.username}
        </Text>
        {userDni && item.user_dni === userDni && (
          <View
            style={[
              styles.buttonContainer,
              { backgroundColor: isDarkTheme ? "#333" : "#fff" },
            ]}
          >
            <Button
              title="Edit"
              onPress={() => handleEdit(item)} // Cambia esto para usar la función handleEdit
            />
            <Button
              title="Delete"
              onPress={() => handleDelete(item.id, item.user_dni)}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkTheme ? "#333" : "#fff" },
        ]}
      >
        <Button
          title={formVisible ? "Hide Form" : "Show Form"}
          onPress={() => setFormVisible(!formVisible)}
        />
        {formVisible && (
          <View>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDarkTheme ? "#333" : "#fff",
                  color: isDarkTheme ? "#fff" : "#000",
                },
              ]}
              placeholder="Service Name"
              onChangeText={setServiceName}
              value={serviceName}
            />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDarkTheme ? "#333" : "#fff",
                  color: isDarkTheme ? "#fff" : "#000",
                },
              ]}
              placeholder="Description"
              onChangeText={setDescription}
              value={description}
            />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDarkTheme ? "#333" : "#fff",
                  color: isDarkTheme ? "#fff" : "#000",
                },
              ]}
              placeholder="Availability"
              onChangeText={setAvailability}
              value={availability}
            />
            <Button
              title={isEditMode ? "Update" : "Create"}
              onPress={handleSubmit}
            />
          </View>
        )}
        <FlatList
          style={[
            styles.scrollContainer,
            { backgroundColor: isDarkTheme ? "#333" : "#fff" },
          ]}
          data={products}
          renderItem={renderItem} // Usando la función renderItem
          keyExtractor={(item) => item.id.toString()}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-start",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 16,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 20,
  },
  productCard: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  productTitle: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default ProductFormScreen;
