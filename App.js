import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Provider, useDispatch } from "react-redux";
import { reloadActions } from "./storage/reload-context";

import store from "./storage";

import { FontProvider } from "./src/FontContext";

import { useFonts, Ionicons } from "@expo/vector-icons";

import HomeScreen from "./src/HomeScreen";
import NewDataScreen from "./src/NewDataScreen";
import ShowResolutionScreen from "./src/ShowResolutionScreen";
import TimeScreen from "./src/TimeScreen";

import "react-native-gesture-handler";

import "react-native-reanimated";

import "react-native-safe-area-context";

import "react-native-screens";

// npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
// kulczowe jest zainstalowanie tych pakietów i dodanie importów tych powyżej

//  eas build -p android --profile preview

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
          tabBarButton: (props) => {
            return (
              <TouchableOpacity
                {...props}
                onPress={() => {
                  console.log("Kliknięto na zakładkę Home!");
                  // Dodaj tutaj swoją logikę lub nawigację
                  dispatch(reloadActions.newReload());
                  navigation.navigate("Home"); // Przykładowa nawigacja do ekranu "Home"
                }}
              />
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="NewData"
        component={NewDataScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Dodaj wyzwanie",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stopwatch-outline" color={color} size={size} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <FontProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Title">
            <Stack.Screen
              name="Title"
              component={MainStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="resolution"
              component={ShowResolutionScreen}
              options={{
                title: "WRÓĆ DO STRONY GŁÓWNEJ",
              }}
            />
            <Stack.Screen
              name="timeScreen"
              component={TimeScreen}
              options={{
                title: "WRÓĆ DO AKTYWNOŚCI",
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FontProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
