import * as ActionTypes from './ActionTypes';

export const history = (state  = { isLoading: true,
                                        errMess: null,
                                        history:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_HISTORY:
        return {...state, isLoading: false, errMess: null, history: action.payload.history};

        case ActionTypes.HISTORY_LOADING:
            return {...state, isLoading: true, errMess: null, history: []}

        case ActionTypes.HISTORY_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};



