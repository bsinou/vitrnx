import React from 'react';
import axios from 'axios';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// VitrnX internal dependencies
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Global CSS style.
import './vitrnx.css';

// Redux
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import audioReducer from './store/reducers/audio';
import authReducer from './store/reducers/auth';
import userReducer from './store/reducers/user';
import uiReducer from './store/reducers/ui';

const rootReducer = combineReducers({
    audio: audioReducer,
    auth: authReducer,
    user: userReducer,
    ui: uiReducer,
});

// Enable Redux devtool in chrome only in dev mode
const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

// This can be a place to define axios defaults globally 
// (below is line is useless: that's the default anyway)
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(app, document.getElementById('vitrnxSPA'));
registerServiceWorker();