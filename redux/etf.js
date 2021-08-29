import * as ActionTypes from './ActionTypes';

export const etf = (state  = { isLoading: true,
                                    errMess: null,
                                    etf:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ETF:
        return {...state, isLoading: false, errMess: null, etf: action.payload};

        case ActionTypes.ETF_LOADING:
            return {...state, isLoading: true, errMess: null, etf: []}

        case ActionTypes.ETF_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.ADD_BUYETF:
        let sale = action.payload;
//  it pushes in the new element into that array
          return { ...state, etf: state.etf.concat(sale)};

        default:
          return state;
    }
};