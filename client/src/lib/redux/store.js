import { persistReducer, persistStore } from "redux-persist";
import counterReducer from "./slices/counterSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";

const persistConfig = { key: "root", storage };

const rootReducer = combineReducers({ counter: counterReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: () => [logger],
});

export const persistor = persistStore(store);
