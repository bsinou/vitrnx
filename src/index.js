import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import thunk from 'redux-thunk';

// VitrnX internal dependencies
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/auth';
import userReducer from './store/reducers/user';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import './vitrnx.css';

// This can be a place to define axios defaults globally 
// (below is line is useless: that's the default anyway)
axios.defaults.headers.post['Content-Type'] = 'application/json';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,    
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

ReactDOM.render(app, document.getElementById('vitrnxSPA'));
registerServiceWorker();
