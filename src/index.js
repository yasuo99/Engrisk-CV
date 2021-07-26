import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import rootReducer from './reducers/rootReducer';
import { Provider } from 'react-redux';

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import { PersistGate } from 'redux-persist/integration/react'
import { store } from './reducers/configureStore'

TimeAgo.addDefaultLocale(en)
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
