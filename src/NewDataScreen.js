import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, StyleSheet, TextInput, Button, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewDataScreen = () => {
  const [newResolutionName, setNewResolutionName] = useState("");
  const [newTime, setNewTime] = useState();

  const addNewAction = async () => {
    // await AsyncStorage.clear();

    AsyncStorage.getItem("nowe pliki").then((value) => {
      const obj = JSON.parse(value);
      if (obj === null) {
        console.log("puste");
        const currentDate = new Date();
        const newObj = {
          allResolutionName: [
            {
              data: currentDate,
              fileName: newResolutionName,
              totalTime: 0,
              allDate: [{ date: currentDate, secondToday: 0 }],
            },
          ],
        };
        AsyncStorage.setItem("nowe pliki", JSON.stringify(newObj));
      } else {
        console.log("pełne");
        const currentDate = new Date();
        const newObj = {
          data: currentDate,
          fileName: newResolutionName,
          totalTime: 0,
          allDate: [{ date: currentDate, secondToday: 0 }],
        };
        obj.allResolutionName.push(newObj);

        // Zapisz zaktualizowany obiekt z nowym elementem w AsyncStorage
        AsyncStorage.setItem("nowe pliki", JSON.stringify(obj));
      }
    });

    console.log("działa");
    // console.log(currentDate);2
    console.log(newTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wpisz nazwę aktywności</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={newResolutionName}
        onChangeText={(text) => setNewResolutionName(text)}
      />
      <Text style={styles.title}>
        Ile czasu codziennie chcesz poświęcać na aktywność (wpisz dane w
        minutach)?
      </Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={newTime}
        onChangeText={(num) => setNewTime(num)}
        keyboardType="numeric"
      />
      <Button
        style={styles.button}
        title="Dodaj zdarzenie"
        onPress={addNewAction}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
  },
  button: {
    marginTop: 20,
  },
  title: {
    marginTop: 20,
    padding: 10,
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1, // Dodajemy obramowanie tylko na dole.
    borderColor: "gray", // Kolor obramowania.
    padding: 2,
    width: "50%",
    textAlign: "center",
  },
});

export default NewDataScreen;
