import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { CartItem } from "./CartItem";

export const OrderItem = ({ cartItems, orderId, amount, date }) => {
  const [isShowDetails, setIsShowDetails] = useState(false);

  return (
    <View style={styles.orderItem}>
      <View style={styles.orderId}>
        <Text>Order Id: {orderId}</Text>
      </View>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}> Total: {amount.toFixed(2)} </Text>
        <Text style={styles.date}> {date} </Text>
      </View>
      <Button
        color={Colors.primary}
        title={isShowDetails ? "Hide Details" : "Show Details"}
        onPress={() => {
          setIsShowDetails((prevState) => !prevState);
        }}
      />
      {isShowDetails && (
        <View style={styles.detailItems}>
          {cartItems.map((item) => (
            <CartItem
              key={item.productId}
              title={item.productTitle}
              quantity={item.quantity}
              amount={item.sum}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  orderId: {
    marginBottom: 5,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "#888",
  },
  detailItems: {
    width: "100%",
  },
});
