import React from "react";
import { Button, FlatList, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { ProductItem } from "../../components/shop/ProductItem";
import { CustomHeaderButton } from "../../components/UI/CustomHeaderButton";
import * as productActions from "../../store/actions/products";
import Colors from "../../constants/Colors";

export const UserProductsScreen = () => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={userProducts}
      renderItem={({ item: { id, title, imageUrl, price, description } }) => (
        <ProductItem
          image={imageUrl}
          title={title}
          price={price}
          description={description}
        >
          <Button
            color={Colors.primary}
            title="Update"
            onSelect={() => {
              // dispatch()
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              dispatch(productActions.deleteProduct(id));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Your Products",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
