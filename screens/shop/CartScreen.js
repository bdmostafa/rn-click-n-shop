import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { set } from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import { CartItem } from "../../components/shop/CartItem";
import { Card } from "../../components/UI/Card";
import { FallbackText } from "../../components/UI/FallbackText";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";

export const CartScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const totalAmountOfCart = useSelector(
    (state) => state.cart.totalAmountOfCart
  );
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
    return cartItemsArray.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(orderActions.addOrder(cartItems, totalAmountOfCart));
    setIsLoading(false);
  };

  return (
    <Card style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:
          <Text style={styles.amount}>
            ${Math.round(totalAmountOfCart.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            color={Colors.accent}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </View>
      <View style={styles.cartItemsContainer}>
        {cartItems.length === 0 ? (
          <FallbackText>
            No cart item found. Please go back to product page and add to cart
          </FallbackText>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.productId}
            renderItem={({
              item: { productId, quantity, productTitle, sum },
            }) => (
              <CartItem
                quantity={quantity}
                title={productTitle}
                amount={sum}
                deletable
                onRemove={() => {
                  dispatch(cartActions.removeFromCart(productId));
                }}
              />
            )}
          />
        )}
      </View>
    </Card>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart",
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
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
  // noCartText: {
  //   marginHorizontal: 50,
  //   marginVertical: 50,
  // },
});
