import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const FallbackText = ({ children }) => {
  return (
    <View style={styles.noText}>
      <Text>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noText: {
    marginHorizontal: 50,
    marginVertical: 20,
  },
});
