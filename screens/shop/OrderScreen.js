import React from "react";
import { FlatList, Text, Platform, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { OrderItem } from "../../components/shop/OrderItem";

export const OrderScreen = () => {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <View style={styles.orderItemsContainer}>
      {orders.length === 0 ? (
        <Text style={styles.noOrderText}>
          No order item found. Please go back to cart page
        </Text>
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
    </View>
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
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
  },
  noOrderText: {
    marginHorizontal: 50,
    marginVertical: 50,
  },
});
