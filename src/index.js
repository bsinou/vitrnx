import React from 'react';
import ReactDOM from 'react-dom';

import thunk from 'redux-thunk';
import axios from 'axios';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

// VitrnX internal dependencies
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/auth';

axios.interceptors.request.use(
    requestConfig => {
        console.log(requestConfig);
        // Edit request config
        return requestConfig;
    }, error => {
        console.log(error);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        console.log(response);
        // Here we can edit response config
        return response;
    }, error => {
        console.log(error);
        return Promise.reject(error);
    }
);

const rootReducer = combineReducers({
    auth: authReducer
});

// Enable Redux devtool in chrome only in dev mode
const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null ) || compose ;


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
