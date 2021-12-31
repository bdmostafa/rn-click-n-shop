import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

export const CartItem = ({ quantity, title, amount, onRemove, deletable }) => {
  return (
    <View style={styles.cartItem}>
      <View style={{ ...styles.itemData, ...styles.itemDataLeft }}>
        <Text numberOfLines={1} style={styles.mainText}>
          {title}
        </Text>
        <Text style={styles.quantity}>(Qty: {quantity})</Text>
      </View>
      <View style={{ ...styles.itemData, ...styles.itemDataRight }}>
        <Text style={styles.mainText}>${amount.toFixed(2)}</Text>
        {deletable && (
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    // marginHorizontal: 20,
    width: "100%",
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemDataLeft: {
    width: "60%",
    justifyContent: "flex-start",
  },
  itemDataRight: {
    width: "40%",
    justifyContent: "flex-end",
  },
  quantity: {
    fontFamily: "open-sans",
    color: Colors.accent,
    fontSize: 16,
    marginHorizontal: 10,
  },
  mainText: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});
