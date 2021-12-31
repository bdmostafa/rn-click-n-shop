import React from "react";
import { Alert, Button, FlatList, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { ProductItem } from "../../components/shop/ProductItem";
import { CustomHeaderButton } from "../../components/UI/CustomHeaderButton";
import * as productActions from "../../store/actions/products";
import Colors from "../../constants/Colors";

export const UserProductsScreen = ({ navigation }) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (productId) => {
    navigation.navigate("EditProduct", { productId });
  };

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Really want to delete this product?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",

        onPress: () => {
          dispatch(productActions.deleteProduct(id));
        },
      },
    ]);
  };

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
          onSelect={() => {
            editProductHandler(id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Update"
            onPress={() => {
              editProductHandler(id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              deleteHandler(id);
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
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    ),
  };
};
