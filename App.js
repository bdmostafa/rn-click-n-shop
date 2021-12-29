import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
// import { AppLoading } from 'expo';
import * as Font from "expo-font";
import productReducers from "./store/reducers/products";
import cartReducers from "./store/reducers/cart";
import ShopNavigator from "./navigation/ShopNavigator";
import { useState } from "react";
import AppLoading from "expo-app-loading";
// import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  products: productReducers,
  cart: cartReducers,
});

// const store = createStore(rootReducer, composeWithDevTools());
const store = createStore(rootReducer);

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
      <ShopNavigator />
    </Provider>
  );
}
