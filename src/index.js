import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import schoolState from './States/SchoolState'
import UserState from './States/UserState';
import LoginState from './States/LoginState';
import BeachState from './States/BeachState';


const reducer = combineReducers({
  schoolState: schoolState,
  userState: UserState,
  loginState: LoginState,
  beachState: BeachState
})

const store = configureStore({
  reducer,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


