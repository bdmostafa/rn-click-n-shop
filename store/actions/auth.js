import AsyncStorage from "@react-native-async-storage/async-storage";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
// export const SIGN_UP = "SIGN_UP";
// export const SIGN_IN = "SIGN_IN";

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId, token });
  };
};

export const signUp = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDAVjv9HJaZoZmh--dtBWQEp83T9JBzeI4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;

      let message = "Something went wrong!";

      if (errorId === "EMAIL_EXISTS") {
        message = "This email exists already!";
      }

      throw new Error(message);
    }

    const resData = await response.json();

    const { idToken, localId, expiresIn } = resData;
    // dispatch({ type: SIGN_UP, token: idToken, userId: localId });
    dispatch(authenticate(localId, idToken, parseInt(expiresIn) * 1000));

    const expirationDate = new Date(
      new Date().getTime() + parseInt(expiresIn) * 1000
    );
    saveDataToLocalStorage(idToken, localId, expirationDate);
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDAVjv9HJaZoZmh--dtBWQEp83T9JBzeI4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;

      let message = "Something went wrong!";

      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      }

      throw new Error(message);
    }

    const resData = await response.json();
    const { idToken, localId, expiresIn } = resData;
    const expiryTimeInMilliSeconds = parseInt(expiresIn) * 1000;
    const expirationDate = new Date(
      new Date().getTime() + expiryTimeInMilliSeconds
    );

    // dispatch({ type: SIGN_IN, token: idToken, userId: localId });
    dispatch(authenticate(localId, idToken, expiryTimeInMilliSeconds));

    saveDataToLocalStorage(idToken, localId, expirationDate);
  };
};

export const logout = () => {
  return (dispatch) => {
    clearLogoutTimer();

    AsyncStorage.removeItem("userData");
    dispatch({ type: LOGOUT });
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToLocalStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({ token, userId, expiryDate: expirationDate.toISOString() })
  );
};
