import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { ProductItem } from "../../components/shop/ProductItem";
import { CustomHeaderButton } from "../../components/UI/CustomHeaderButton";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";
import { Ionicons } from "@expo/vector-icons";

export const ProductOverviewScreen = ({ navigation }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  const fetchProducts = useCallback(async () => {
    setIsError(null);
    setIsRefreshing(true);

    try {
      await dispatch(productsActions.getProducts());
    } catch (err) {
      setIsError(err.message);
    }

    setIsRefreshing(false);
  }, [dispatch, setIsError, setIsLoading]);

  useEffect(() => {
    setIsLoading(true);

    fetchProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, fetchProducts]);

  useEffect(() => {
    const willFocusSub = navigation.addListener("willFocus", fetchProducts);

    return () => {
      willFocusSub.remove();
    };
  }, [fetchProducts]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Text style={{ marginVertical: 10 }}> {isError}</Text>
        <Button
          title="Try again"
          onPress={fetchProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={fetchProducts}
      refreshing={isRefreshing}
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
          onSelect={() => {
            selectItemHandler(id, title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(id, title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(item));
            }}
          />
        </ProductItem>
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "open-sans",
  },
});
