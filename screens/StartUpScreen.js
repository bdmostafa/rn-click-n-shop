import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const StartUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const goLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      console.log("userData===", userData);

      if (!userData) {
        navigation.navigate("Auth");
        return;
      }

      const parsedData = JSON.parse(userData);
      const { token, userId, expiryDate } = parsedData;
      const expirationDate = new Date(expiryDate);

      if (!token || !userId || expirationDate <= new Date()) {
        navigation.navigate("Auth");
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      navigation.navigate("Shop");
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };

    goLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
