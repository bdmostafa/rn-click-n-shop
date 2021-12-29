import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { CartItem } from "../../components/shop/CartItem";
import Colors from "../../constants/Colors";

export const CartScreen = () => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmountOfCart);
  const cartItems = useSelector((state) => {
    const cartItemsArray = [];

    for (const key in state.cart.items) {
      const cartItemHandler = (key) => {
        return state.cart.items[key];
      };

      cartItemsArray.push({
        productId: key,
        productTitle: cartItemHandler(key).productTitle,
        productPrice: cartItemHandler(key).productPrice,
        quantity: cartItemHandler(key).quantity,
        sum: cartItemHandler(key).sum,
      });
    }
    return cartItemsArray;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now"
          disabled={cartItems.length === 0}
        />
      </View>
      <View style={styles.cartItemsContainer}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={({ item: { quantity, productTitle, sum } }) => (
            <CartItem
              quantity={quantity}
              title={productTitle}
              amount={sum}
              onRemove={() => {}}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
  cartItemsContainer: {
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
