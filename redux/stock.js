import * as ActionTypes from "./ActionTypes";

export const stock = (state = { errMess: null, stock: [] }, action) => {
  switch (action.type) {
    case ActionTypes.STOCK_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_STOCK:
      return { ...state, stock: action.payload };

    default:
      return state;
  }
};
