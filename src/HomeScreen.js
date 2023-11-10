import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { Text, StyleSheet, Button, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [userData, setUserData] = useState({});
  const [allElements, setAllElements] = useState();
  const reloadNumber = useSelector((state) => state.reloadStatus.reloadNumber);

  const navigation = useNavigation();

  const clickElement = () => {
    navigation.navigate("resolution");
  };

  useEffect(() => {
    AsyncStorage.getItem("nowe pliki").then((value) => {
      const obj = JSON.parse(value);
      setUserData(obj);

      const newElements = obj.allResolutionName.map((resolution, index) => (
        <TouchableOpacity onPress={clickElement} style={styles.bar}>
          <Text style={styles.textInsideBar}>{resolution.fileName}</Text>
        </TouchableOpacity>
      ));
      setAllElements(newElements);

      const data = obj.data;
      const storedDate = new Date(data);

      console.log(storedDate);
      console.log(obj);
    });
  }, [reloadNumber]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>HomeScreen!</Text>
      <Text style={styles.text}>{reloadNumber}</Text>
      {allElements}
      {/* <Text style={styles.text}>{userData.fileName}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bar: {
    borderWidth: 1,
    width: "90%",
    margin: 10,
  },
  textInsideBar: {
    padding: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
