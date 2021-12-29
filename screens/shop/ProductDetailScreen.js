import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";

export const ProductDetailScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const productId = navigation.getParam("productId");

  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}
        />
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}> ${selectedProduct.price.toFixed(2)}</Text>
        <Text style={styles.offPrice}>
          {" "}
          ${(selectedProduct.price * 1.1).toFixed(2)} (10% Off){" "}
        </Text>
      </View>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = ({ navigation }) => {
  const productTitle = navigation.getParam("productTitle");

  return {
    headerTitle: productTitle,
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    // textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  offPrice: {
    textDecorationLine: "line-through",
  },
  price: {
    fontSize: 20,
    color: Colors.accent,
    fontFamily: "open-sans-bold",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: "open-sans",
  },
});
