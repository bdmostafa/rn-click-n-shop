import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { OrderItem } from "../../components/shop/OrderItem";
import { Card } from "../../components/UI/Card";
import { FallbackText } from "../../components/UI/FallbackText";
import * as ordersActions from "../../store/actions/orders";
import Colors from "../../constants/Colors";

export const OrderScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    setIsLoading(true);
    dispatch(ordersActions.getOrders()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Card style={styles.orderItemsContainer}>
      {orders.length === 0 ? (
        <FallbackText>
          No order item found. Please go back to cart page
        </FallbackText>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OrderItem
              orderId={item.id}
              amount={item.totalAmountOfCart}
              date={item.readableDate}
              cartItems={item.items}
            />
          )}
        />
      )}
    </Card>
  );
};

OrderScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
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

const styles = StyleSheet.create({
  orderItemsContainer: {
    elevation: 0,
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
