// import { SIGN_IN, SIGN_UP } from "../actions/auth";

import { AUTHENTICATE } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  const { token, userId } = action;

  switch (action.type) {
    case AUTHENTICATE:
      return {
        token,
        userId,
      };

    //   case SIGN_UP:
    //   return {
    //     token,
    //     userId,
    //   };
    // case SIGN_IN:
    //   return {
    //     token,
    //     userId,
    //   };

    default:
      return state;
  }
};
