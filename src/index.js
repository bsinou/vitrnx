import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { createStore, applyMiddleware, compose, combineReducers} from 'redux'; 

import thunk from 'redux-thunk';

import axios from 'axios';


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/auth';



// axios.defaults.baseURL = 'https://mm.sinou.org/api';
// axios.defaults.baseURL = 'https://montchenu40.firebaseio.com';
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

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
        // Edit request config
        return response;
    }, error => {
        console.log(error);
        return Promise.reject(error);
    }
);


const rootReducer = combineReducers({
    auth: authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


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
