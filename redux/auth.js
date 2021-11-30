import * as ActionTypes from "./ActionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Auth = (
  state = {
    isLoading: false,
    isAuthenticated: AsyncStorage.getItem("token") ? true : false,
    token: AsyncStorage.getItem("token"),
    user: AsyncStorage.getItem("creds") ? AsyncStorage.getItem("creds") : null,
    id: AsyncStorage.getItem("id"),
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        user: action.creds,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMess: "",
        token: action.token,
        id: action.id,
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMess: action.message,
      };
    case ActionTypes.LOGOUT_REQUEST:
      return { ...state, isLoading: true, isAuthenticated: true };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: "",
        user: null,
      };
    default:
      return state;
  }
};
