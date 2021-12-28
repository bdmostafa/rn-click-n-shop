import React from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import { ProductItem } from "../../components/shop/ProductItem";

export const ProductOverviewScreen = () => {
  const products = useSelector((state) => state.products.availableProducts);

  return (
    <FlatList
      data={products}
      keyExtractor={(product) => product.id}
      renderItem={({ item: { title, imageUrl, price, description } }) => (
        <ProductItem
          image={imageUrl}
          title={title}
          price={price}
          description={description}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

ProductOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
};
