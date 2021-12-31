import React from "react";
import { FlatList, Text, Platform, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { OrderItem } from "../../components/shop/OrderItem";
import { Card } from "../../components/UI/Card";
import { FallbackText } from "../../components/UI/FallbackText";

export const OrderScreen = () => {
  const orders = useSelector((state) => state.orders.orders);

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
  }
});
