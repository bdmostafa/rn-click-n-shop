import React from "react";
import { FlatList, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { ProductItem } from "../../components/shop/ProductItem";
import { CustomHeaderButton } from "../../components/UI/CustomHeaderButton";
import * as cartActions from "../../store/actions/cart";

export const ProductOverviewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      keyExtractor={(product) => product.id}
      renderItem={({
        item,
        item: { id, title, imageUrl, price, description },
      }) => (
        <ProductItem
          image={imageUrl}
          title={title}
          price={price}
          description={description}
          onViewDetail={() => {
            navigation.navigate("ProductDetail", {
              productId: id,
              productTitle: title,
            });
          }}
          onAddToCart={() => {
            dispatch(cartActions.addToCart(item));
          }}
        />
      )}
    />
  );
};

ProductOverviewScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "All Products",
    headerRight: () => (
      <HeaderButtons headerButtonComponent={CustomHeaderButton}>
        <Item
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          title="Cart"
          onPress={() => {
            navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};
