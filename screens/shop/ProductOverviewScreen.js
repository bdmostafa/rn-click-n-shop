import React from "react";
import { FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { ProductItem } from "../../components/shop/ProductItem";
import { CustomHeaderButton } from "../../components/UI/CustomHeaderButton";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
import { Ionicons } from "@expo/vector-icons";

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
    headerLeft: () => (
      <HeaderButtons headerButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
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
      //   <Ionicons

      //    name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
      //    size={23}
      //    color={Platform.OS === "android" ? "white" : Colors.primary}
      //    onPress={() => {
      //           navigation.navigate("Cart");
      //         }}
      //  />
    ),
  };
};
