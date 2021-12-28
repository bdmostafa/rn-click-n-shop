import React from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";

export const ProductOverviewScreen = () => {
  const products = useSelector((state) => state.products.availableProducts);

  return (
    <FlatList
      data={products}
      keyExtractor={(product) => product.id}
      renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
    />
  );
};

ProductOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
};
