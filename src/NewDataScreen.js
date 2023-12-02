import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  StyleSheet,
  TextInput,
  Button,
  View,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as Font from "expo-font";

const NewDataScreen = () => {
  const [newResolutionName, setNewResolutionName] = useState("");
  const [newTime, setNewTime] = useState();

  useEffect(() => {
    const loadFonts = async () => {
      // await Font.loadAsync({
      //   "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
      //   "Bebas-Regular": require("../assets/fonts/BebasNeue-Regular.ttf"),
      // });
    };
    loadFonts();
  }, []);

  const addNewAction = async () => {
    // await AsyncStorage.clear();

    AsyncStorage.getItem("nowe pliki").then((value) => {
      const obj = JSON.parse(value);
      if (obj === null) {
        console.log("puste");
        const currentDate = new Date();

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Miesiące są liczone od 0 do 11, więc dodajemy 1
        const year = currentDate.getFullYear();

        // Formatowanie do postaci "dzień miesiąc rok"
        const formattedDate = `${day} ${month} ${year}`;

        const newObj = {
          allResolutionName: [
            {
              data: currentDate,
              fileName: newResolutionName,
              totalTime: 0,
              allDate: [{ date: formattedDate, secondToday: 0 }],
              declaredTime: newTime,
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
          declaredTime: newTime,
        };
        obj.allResolutionName.push(newObj);

        // Zapisz zaktualizowany obiekt z nowym elementem w AsyncStorage
        AsyncStorage.setItem("nowe pliki", JSON.stringify(obj));
      }
    });

    // console.log("działa");
    // console.log(currentDate);2
    // console.log(newTime);
    setNewTime();
    setNewResolutionName();
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
      <TouchableOpacity style={styles.button} onPress={addNewAction}>
        <Text style={styles.textButton}>DODAJ ZDARZENIE</Text>
      </TouchableOpacity>
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
    marginTop: 40,
    width: "100%",
    height: 50,
    backgroundColor: "#90caf9",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    marginTop: 20,
    padding: 10,
    textAlign: "center",
    fontSize: 12,
    fontFamily: "RubikMonoOne-Regular",
  },
  textButton: {
    color: "black",
    fontFamily: "RubikMonoOne-Regular",
  },
  input: {
    borderBottomWidth: 1, // Dodajemy obramowanie tylko na dole.
    borderColor: "gray", // Kolor obramowania.
    padding: 2,
    width: "50%",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 14,
  },
});

export default NewDataScreen;
