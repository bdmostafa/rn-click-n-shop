import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { CustomHeaderButton } from "../../components/UI/CustomHeaderButton";
import { InputText } from "../../components/UI/InputText";
import * as productActions from "../../store/actions/products";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };

    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

export const EditProductScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const productId = navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  // const [titleIsValid, setTitleIsValid] = useState(false);
  // const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  // const [imageUrl, setImageUrl] = useState(
  //   editedProduct ? editedProduct.imageUrl : ""
  // );
  // const [price, setPrice] = useState("");
  // const [description, setDescription] = useState(
  //   editedProduct ? editedProduct.description : ""
  // );

  const { title, description, imageUrl, price } = formState.inputValues;

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }

    if (editedProduct) {
      dispatch(
        productActions.updateProduct(productId, title, description, imageUrl)
      );
    } else {
      dispatch(
        productActions.createProduct(title, description, imageUrl, +price)
      );
    }
    navigation.goBack();
  }, [dispatch, productId, formState]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  // const textChangeHandler = (inputIdentifier, text) => {
  //   // if (text.trim().length === 0) {
  //   //   setTitleIsValid(false);
  //   // } else {
  //   //   setTitleIsValid(true);
  //   // }
  //   // setTitle(text);
  //   let isValid = false;
  //   if (text.trim().length > 0) {
  //     isValid = true;
  //   }
  //   dispatchFormState({
  //     type: FORM_INPUT_UPDATE,
  //     value: text,
  //     isValid: isValid,
  //     input: inputIdentifier,
  //   });
  // };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      // keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <InputText
            id="title"
            label="Title"
            errorText="Please enter a valid title"
            // onChangeText={(text) => setTitle(text)}
            // onChangeText={textChangeHandler.bind(this, "title")}
            onInputChange={inputChangeHandler}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            initialValue={editedProduct ? editedProduct.title : ""}
            initiallyValid={!!editedProduct}
            // onEndEditing={() => console.log("onEndEditing!!!")}
            // onSubmitEditing={() => console.log("onSubmitEditing")}
            required
          />
          <InputText
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <InputText
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
              number
            />
          )}
          <InputText
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
            returnKeyType="default"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = ({ navigation }) => {
  const submitFn = navigation.getParam("submit");

  return {
    headerTitle: navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  // formControl: {
  //   width: "100%",
  // },
  // label: {
  //   fontFamily: "open-sans-bold",
  //   marginVertical: 8,
  // },
  // input: {
  //   paddingHorizontal: 2,
  //   paddingVertical: 5,
  //   borderBottomColor: "#ccc",
  //   borderBottomWidth: 1,
  // },
  // errorMsg: {
  //   fontStyle: "italic",
  //   color: "red",
  // },
});
