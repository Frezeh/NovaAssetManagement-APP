import * as ActionTypes from "./ActionTypes";

export const nmmf = (
  state = { isLoading: true, errMess: null, nmmf: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_NMMF:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        nmmf: action.payload,
      };

    case ActionTypes.NMMF_LOADING:
      return { ...state, isLoading: true, errMess: null, nmmf: [] };

    case ActionTypes.NMMF_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    case ActionTypes.ADD_BUYNMMF:
      let sale = action.payload;
      return { ...state, nmmf: state.nmmf.concat(sale) };

    default:
      return state;
  }
};
