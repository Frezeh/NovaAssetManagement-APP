import * as ActionTypes from './ActionTypes';

export const favorites = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITE:

//check if this favorite dishes is already on the list of favorites, if yes. You don't need to change the state
            if (state.some(el => el === action.payload))
                return state;
                
//The payload will contain the dishID from the dish we want to add to the favorites. 
            else
                return state.concat(action.payload);

        case ActionTypes.DELETE_FAVORITE:
        
//from the state, we will filter out that payload, the dish thatcorresponds to that payload. will be removed from the state.And then that modified state is returned from this action here                    
            return state.filter((favorite) => favorite !== action.payload);
                
        default:
          return state;
      }
};