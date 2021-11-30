import * as ActionTypes from "./ActionTypes";

export const ndf = (
  state = { isLoading: true, errMess: null, ndf: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_NDF:
      return { ...state, isLoading: false, errMess: null, ndf: action.payload };

    case ActionTypes.NDF_LOADING:
      return { ...state, isLoading: true, errMess: null, ndf: [] };

    case ActionTypes.NDF_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    case ActionTypes.ADD_BUYNDF:
      let sale = action.payload;
      return { ...state, ndf: state.ndf.concat(sale) };

    default:
      return state;
  }
};
