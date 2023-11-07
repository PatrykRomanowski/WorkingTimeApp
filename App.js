import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "./src/HomeScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Book"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Books",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Title">
        <Stack.Screen
          name="Title"
          component={MainStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
