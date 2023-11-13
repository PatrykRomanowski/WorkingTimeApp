import React, { useEffect, useState, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";

import AsyncStorage from "@react-native-async-storage/async-storage";

const TimeScreen = () => {
  const [second, setSecond] = useState(0);
  const [actualTime, setActualTime] = useState("");
  const [showStopButton, setShowStopButton] = useState(true);
  const intervalIdRef = useRef(null);

  const index = useSelector((state) => state.actualResolution.resolutionIndex);

  const navigation = useNavigation();

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setSecond((prevValue) => prevValue + 1);
      const hour = Math.floor(second / (60 * 24)).toString();
      const min = Math.floor((second / 60) % 24).toString();
      const sec = (second % 60).toString();

      if (min.length === 1 && sec.length === 1) {
        const timeStr = `${hour}:0${min}:0${sec}`;
        setActualTime(timeStr);
      } else if (min.length === 1 && sec.length !== 1) {
        const timeStr = `${hour}:0${min}:${sec}`;
        setActualTime(timeStr);
      } else if (min.length !== 1 && sec.length !== 1) {
        const timeStr = `${hour}:${min}:${sec}`;
        setActualTime(timeStr);
      } else if (min.length !== 1 && sec.length === 1) {
        const timeStr = `${hour}:${min}:0${sec}`;
        setActualTime(timeStr);
      }
    }, 1000);

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [second]);

  const stopTime = () => {
    clearInterval(intervalIdRef.current);
    setShowStopButton(false);
  };

  const resumeTime = () => {
    setSecond((prevValue) => prevValue + 1);
    setShowStopButton(true);
  };

  const endTimer = () => {
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Miesiące są liczone od 0 do 11, więc dodajemy 1
    const year = currentDate.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    console.log("XD" + formattedDate);

    AsyncStorage.getItem("nowe pliki").then((value) => {
      const obj = JSON.parse(value);
      console.log(obj.allResolutionName[index].allDate);
      const actualIndex = obj.allResolutionName[index].allDate.findIndex(
        (el) => {
          const newDate = el.date;
          const currentDate2 = new Date(newDate);
          const day = currentDate2.getDate();
          const month = currentDate2.getMonth() + 1; // Miesiące są liczone od 0 do 11, więc dodajemy 1
          const year = currentDate2.getFullYear();
          const newFormattedDate = `${day} ${month} ${year}`;
          console.log(newFormattedDate);
          if (newFormattedDate === formattedDate) {
            console.log("prawda");
            return true;
          } else {
            console.log("fałsz");
            return false;
          }
        }
      );
      console.log(actualIndex);

      if (actualIndex !== -1) {
        const newObj = {
          date: obj.allResolutionName[index].allDate[actualIndex].date,
          secondToday:
            parseInt(
              obj.allResolutionName[index].allDate[actualIndex].secondToday
            ) + second,
        };

        obj.allResolutionName[index].totalTime =
          parseInt(obj.allResolutionName[index].totalTime) + second;

        obj.allResolutionName[index].allDate[actualIndex] = newObj;
        AsyncStorage.setItem("nowe pliki", JSON.stringify(obj));
        console.log(obj.allResolutionName[index].allDate);
      } else {
        const newDate = new Date();
        const newObj = {
          date: newDate,
          secondToday: second,
        };
        obj.allResolutionName[index].totalTime =
          parseInt(obj.allResolutionName[index].totalTime) + second;

        obj.allResolutionName[index].allDate.push(newObj);
        AsyncStorage.setItem("nowe pliki", JSON.stringify(obj));
        console.log(obj.allResolutionName[index].allDate);
      }

      //   console.log(actualIndex);
    });

    navigation.navigate("resolution");
  };

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "LED-Regular": require("../assets/fonts/LED.ttf"),
      });
    };

    loadFonts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{actualTime}</Text>
      {showStopButton ? (
        <TouchableOpacity onPress={stopTime} style={styles.button}>
          <Text style={styles.buttonText}>Zatrzymaj</Text>
        </TouchableOpacity>
      ) : null}
      {showStopButton ? null : (
        <TouchableOpacity onPress={resumeTime} style={styles.button}>
          <Text style={styles.buttonText}>Wznów</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={endTimer} style={styles.endButton}>
        <Text style={styles.buttonText}>Zakończ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "LED-Regular",
    fontSize: 80,
    color: "white",
    top: "40%",
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    // justifyContent: "end",
    alignItems: "center",
  },
  button: {
    padding: 10,
    width: "90%",
    top: "50%",
  },
  endButton: {
    padding: 10,
    width: "90%",
    top: "60%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default TimeScreen;
