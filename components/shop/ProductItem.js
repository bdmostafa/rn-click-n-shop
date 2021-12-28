import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";

import Colors from "../../constants/Colors";

export const ProductItem = ({
  title,
  image,
  price,
  description,
  onViewDetail,
  onAddToCart,
}) => {
  return (
    <View style={styles.productContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: image }} />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.offPrice}>
            {" "}
            ${(price * 1.1).toFixed(2)} (10% Off){" "}
          </Text>
          <Text style={styles.price}> ${price.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.description}>
        <Text>{description.substring(0, 45)}</Text>
      </View>
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="View Details"
          onPress={onViewDetail}
        />
        <Button color={Colors.primary} title="To Cart" onPress={onAddToCart} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
  },
  imageContainer: {
    width: "100%",
    height: "55%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: "15%",
  },
  description: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  priceContainer: {
    flexDirection: "row",
  },
  offPrice: {
    textDecorationLine: 'line-through'
  },
  price: {
    fontSize: 14,
    color: Colors.accent,
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "20%",
    paddingHorizontal: 20,
  },
});
