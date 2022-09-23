import ReactDOM from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware } from 'redux';
import App from './App';
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import { createStore } from 'redux';
import rootReducer from './redux/reducers';
import 'bootstrap/dist/css/bootstrap.min.css';

const createStoreMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={createStoreMiddleware(rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
      )} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
