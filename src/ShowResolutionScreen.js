import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";

import { actualResolutionDataActions } from "../storage/actualResolutionData-context";

const ShowResolutionScreen = () => {
  const [actualElements, setActualElements] = useState([]);
  const [showDeclaredTime, setShowDeclaredTime] = useState(0);
  const [timeBalance, setTimeBalance] = useState(0);
  const actualResolution = useSelector(
    (state) => state.actualResolution.actualResolutionName
  );

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const ShowTimer = () => {
    navigation.navigate("timeScreen");
  };

  const calculateProcentBar = (declaredTime, getMinute) => {
    const procent = (getMinute * 100) / declaredTime;
    let result = parseInt(procent);
    if (procent >= 100) {
      result = 100;
    }
    return `${result}%`;
  };

  const calculateBalance = (declaratedTime, totalTime, daysDifference) => {
    const result = daysDifference * declaratedTime * -1 + totalTime;
    setTimeBalance(result);
  };

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "RubikMonoOne-Regular": require("../assets/fonts/RubikMonoOne-Regular.ttf"),
        "Monoton-Regular": require("../assets/fonts/Monoton-Regular.ttf"),
        "Pock-Regular": require("../assets/fonts/POCKC___.ttf"),
        "LED-Regular": require("../assets/fonts/LED.ttf"),
        "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
        "Bebas-Regular": require("../assets/fonts/BebasNeue-Regular.ttf"),
      });

      const value = await AsyncStorage.getItem("nowe pliki");
      const obj = JSON.parse(value);
      const actualIndex = obj.allResolutionName.findIndex(
        (el) => el.fileName === actualResolution
      );

      const declaratedTime = parseInt(
        // downloading the declareted time
        obj.allResolutionName[actualIndex].declaredTime
      );

      const totalTime = parseInt(
        // downloading the total Time
        obj.allResolutionName[actualIndex].totalTime / 60
      );

      const startDate = new Date(obj.allResolutionName[actualIndex].data);
      console.log(startDate);
      const actualDateforTimeDiffrence = new Date();

      const timeDifference =
        actualDateforTimeDiffrence.getTime() - startDate.getTime();

      const daysDifference = // calculations the days diffrence
        Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;

      calculateBalance(declaratedTime, totalTime, daysDifference);

      const actualDate = obj.allResolutionName[actualIndex];
      dispatch(
        actualResolutionDataActions.addNewResolutionIndex({
          index: actualIndex,
        })
      );
      console.log(actualDate);
      setShowDeclaredTime(actualDate.declaredTime);

      const newElements = actualDate.allDate.map((item) => {
        const date = new Date(item.date);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const dateStr = `${day}-${month}-${year}`;

        const totalTime = parseInt(item.secondToday);
        const getMinute = parseInt(totalTime / 60);
        const getSecond = totalTime % 60;
        const timeStr = `${getMinute} MIN ${getSecond} SEC`;

        const declaredTime = parseInt(actualDate.declaredTime);
        const procentBar = calculateProcentBar(declaredTime, getMinute);

        const colorBar = procentBar === "100%" ? "green" : "red";
        console.log(procentBar);

        return (
          <View style={styles.historyDay} key={item.date}>
            <View style={styles.dateContainer}>
              <Text style={styles.text}>Data pracy: </Text>
              <Text style={styles.text}>{dateStr}</Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.text}>Czas pracy: </Text>
              <Text style={styles.text}>{timeStr}</Text>
            </View>
            <View style={styles.bar}>
              <View
                style={[
                  styles.fillBar,
                  { width: procentBar, backgroundColor: colorBar },
                ]}
              ></View>
            </View>
          </View>
        );
      });
      newElements.reverse();
      setActualElements(newElements);
    };

    loadFonts();
  }, [actualResolution]);

  console.log(actualResolution);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>pracujesz nad: </Text>
        <Text style={styles.actualResolution}>{actualResolution}</Text>
        <TouchableOpacity style={styles.button} onPress={ShowTimer}>
          <Text style={styles.buttonText}>Rozpocznij</Text>
        </TouchableOpacity>
        <Text style={styles.historyTitle}>Historia:</Text>
        {actualElements}
      </ScrollView>
      <View style={styles.fixedText}>
        <Text style={styles.insideBottomBarText}>
          codziennie zadeklarowano: {showDeclaredTime}MIN
        </Text>
        <Text
          style={[
            styles.insideBottomBarText,
            { color: timeBalance >= 0 ? "green" : "red" },
          ]}
        >
          bilans: {timeBalance}MIN
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "RubikMonoOne-Regular",
    color: "#313131",
    fontSize: 16,
    width: "100%",
    textAlign: "center",
    margin: 10,
  },
  container: {
    flexGrow: 1,
  },
  insideBottomBarText: {
    width: "100%",
    textAlign: "center",
    fontFamily: "Bebas-Regular",
    fontSize: 18,
  },
  fixedText: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "gray",
    padding: 10,
  },
  bar: {
    width: "100%",
    height: 5,
  },
  fillBar: {
    height: "100%",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  historyTitle: {
    fontFamily: "RubikMonoOne-Regular",
    color: "#313131",
    fontSize: 16,
    width: "100%",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  text: {
    fontFamily: "Bebas-Regular",
    fontSize: 18,
    color: "#313131",
    // fontWeight: "500",
  },
  button: {
    width: "100%",
    backgroundColor: "#90caf9",
    marginBottom: 20,
    marginTop: 40,
  },
  buttonText: {
    fontFamily: "RubikMonoOne-Regular",
    color: "#313131",
    fontSize: 16,
    textAlign: "center",
    padding: 15,
  },
  actualResolution: {
    fontFamily: "RubikMonoOne-Regular",
    color: "#0d47a1",
    fontSize: 16,
    width: "100%",
    textAlign: "center",
  },
  historyDay: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    // padding: 10,
  },
  dateContainer: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "center",
  },
});

export default ShowResolutionScreen;
