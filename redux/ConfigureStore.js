import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createForms } from 'react-redux-form/native';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dishes } from './dishes';
import { comments } from './comments';
import { promotions } from './promotions';
import { leaders } from './leaders';
import { favorites } from './favorites';
import { etf } from './etf';
import { ndf } from './ndf';
import { nmmf } from './nmmf';
import { Auth } from './auth';
import { InitialFeedback } from './forms';
import { stock } from './stock';
import { user } from './user';
import { history } from './history';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true
  }

export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {
            dishes: dishes,
            comments: comments,
            promotions: promotions,
            leaders: leaders,
            favorites,
            auth: Auth,
            etf: etf,
            ndf: ndf,
            nmmf: nmmf,
            stock: stock,
            user: user,
            history: history,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

const persistor = persistStore(store)

    return { persistor, store };
}