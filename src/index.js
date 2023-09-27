import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usa il local storage

import schoolState from './States/SchoolState';
import UserState from './States/UserState';
import LoginState from './States/LoginState';
import BeachState from './States/BeachState';

const rootReducer = combineReducers({
  schoolState: schoolState,
  userState: UserState,
  loginState: LoginState,
  beachState: BeachState,
});

// Configura il persistConfig
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
