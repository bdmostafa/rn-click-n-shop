import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
// import { AppLoading } from 'expo';
import * as Font from "expo-font";
import productReducers from "./store/reducers/products";
import cartReducers from "./store/reducers/cart";
import orderReducers from "./store/reducers/orders";
import authReducers from "./store/reducers/auth";
// import ShopNavigator from "./navigation/ShopNavigator";
import { useState } from "react";
import AppLoading from "expo-app-loading";
// import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import { NavigationContainer } from "./navigation/NavigationContainer";
import { LogBox } from "react-native";
import { enableScreens } from "react-native-screens";

//Ignore all log notifications
LogBox.ignoreAllLogs();

enableScreens();

const rootReducer = combineReducers({
  auth: authReducers,
  products: productReducers,
  cart: cartReducers,
  orders: orderReducers,
});

// const store = createStore(rootReducer, composeWithDevTools());
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = async () => {
  return await Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  if (!isFontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setIsFontLoaded(true);
        }}
        onError={(error) => console.log(error)}
      />
    );
  }

  return (
    <Provider store={store}>
      {/* <ShopNavigator /> */}
      <NavigationContainer />
    </Provider>
  );
}
