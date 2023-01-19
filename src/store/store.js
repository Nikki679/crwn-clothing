import { compose, legacy_createStore, applyMiddleware } from "redux";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger";
//import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from "./root-saga";
import { rootReducer } from "./root-reducer";

const persistConfig = {
    key:'root',
    storage,
    whitelist:['cart']
}

const sagaMiddleware = createSagaMiddleware()

export const persistedReducer = persistReducer(persistConfig,rootReducer);

const middleware = [process.env.NODE_ENV === 'development' && logger,sagaMiddleware].filter(Boolean);

const composedEnchancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const composedEnchancers = composedEnchancer(applyMiddleware(...middleware));

export const store = legacy_createStore(persistedReducer, undefined, composedEnchancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store)
