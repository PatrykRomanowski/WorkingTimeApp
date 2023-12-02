import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Modal,
  Button,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "./FontContext";
import { Ionicons } from "@expo/vector-icons";
// import * as Font from "expo-font";

import { reloadActions } from "../storage/reload-context";
import { actualResolutionDataActions } from "../storage/actualResolutionData-context";

// import * as Font from "expo-font";

const HomeScreen = () => {
  const [userData, setUserData] = useState({});
  const [allElements, setAllElements] = useState();
  const reloadNumber = useSelector((state) => state.reloadStatus.reloadNumber);
  const [messageWindow, setMessageWindow] = useState(false);
  const [fileNameForDelete, setFileNameForDelete] = useState();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const clickElement = (nameElement) => {
    dispatch(
      actualResolutionDataActions.addActualResolution({
        resolutionName: nameElement,
      })
    );
    console.log(nameElement);
    navigation.navigate("resolution");
  };

  const showMessage = (fileName) => {
    setFileNameForDelete(fileName);
    setMessageWindow(true);
  };

  const closeModal = () => {
    setMessageWindow(false);
  };

  const deleteElement = () => {
    console.log("delete element");
    console.log(fileNameForDelete);
    AsyncStorage.getItem("nowe pliki").then((value) => {
      const obj = JSON.parse(value);
      const indexToDelete = obj.allResolutionName.findIndex(
        (el) => el.fileName === fileNameForDelete
      );

      if (indexToDelete !== -1) {
        obj.allResolutionName.splice(indexToDelete, 1);
        console.log(obj);
      }
      AsyncStorage.setItem("nowe pliki", JSON.stringify(obj));
      dispatch(reloadActions.newReload());
    });
    setMessageWindow(false);
  };

  useEffect(() => {
    // const loadFonts = async () => {
    //   await Font.loadAsync({
    //     "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    //     "Bebas-Regular": require("../assets/fonts/BebasNeue-Regular.ttf"),
    //   });
    // };
    // loadFonts();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("nowe pliki").then((value) => {
      const obj = JSON.parse(value);
      setUserData(obj);

      const newElements = obj.allResolutionName.map((resolution, index) => (
        <TouchableOpacity
          onPress={() => clickElement(resolution.fileName)}
          style={styles.bar}
        >
          <Text style={styles.textInsideBar}>{resolution.fileName}</Text>
          <TouchableOpacity
            style={styles.deleteElementButton}
            onPress={() => showMessage(resolution.fileName)}
          >
            <Ionicons name="trash" size={22} />
          </TouchableOpacity>
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
      <Image
        source={require("../assets/img/resolution4.jpg")} // Podaj dane zaszytego obrazu
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.headerStyle}>Twoje postanowienia:</Text>
      {allElements}
      {/* <Text style={styles.text}>{userData.fileName}</Text> */}
      <Modal
        animationType="slide" // opcjonalnie: rodzaj animacji, np. 'slide', 'fade', 'none'
        transparent={true} // czy modal ma być transparentny
        visible={messageWindow}
        onRequestClose={closeModal} // Funkcja wywoływana po naciśnięciu przycisku "back" na Androidzie
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTextHeader}>
              Czy napewno chcesz usunąć postanowienie?
            </Text>
            <View style={styles.buttonsModalContainer}>
              <TouchableOpacity
                onPress={deleteElement}
                style={styles.modalButton}
              >
                <Text style={styles.modalText}>TAK</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
                <Text style={styles.modalText}>NIE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  modalButton: {
    margin: 20,
    width: 160,
    height: 40,
    backgroundColor: "#2196f3",
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontFamily: "Bebas-Regular",
    fontSize: 18,
    color: "white",
  },
  modalTextHeader: {
    textAlign: "center",
    fontFamily: "Bebas-Regular",
    fontSize: 22,
  },
  buttonsModalContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Kolor tła modalu
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5, // cień (opcjonalnie)
  },
  headerStyle: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    textAlign: "center",
    fontFamily: "Bebas-Regular",
    fontSize: 22,
  },
  deleteElementButton: {
    padding: 5,
    marginRight: 5,
  },
  bar: {
    borderWidth: 1,
    borderRadius: 10,
    width: "90%",
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: "40%",
    marginTop: 50,
  },
  textInsideBar: {
    padding: 10,
    textAlign: "center",
    flex: 1,
    fontFamily: "Bebas-Regular",
    fontSize: 18,
  },
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
