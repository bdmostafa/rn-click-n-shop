export const SIGN_UP = "SIGN_UP";
export const SIGN_IN = "SIGN_IN";

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
    console.log(resData);

    const { idToken, localId } = resData;
    dispatch({ type: SIGN_UP, token: idToken, userId: localId });
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
    console.log(resData);

    const { idToken, localId } = resData;
    dispatch({ type: SIGN_IN, token: idToken, userId: localId });
  };
};
