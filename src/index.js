import React from 'react';

import axios from 'axios';
import thunk from 'redux-thunk';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

import audioReducer from './store/reducers/audio';
import authReducer from './store/reducers/auth';
import userReducer from './store/reducers/user';
import uiReducer from './store/reducers/ui';
import * as actions from './store/actions/index';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';


// Playing sound
import Sound from 'react-sound';

// VitrnX internal dependencies
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './vitrnx.css';

// This can be a place to define axios defaults globally 
// (below is line is useless: that's the default anyway)
axios.defaults.headers.post['Content-Type'] = 'application/json';

const rootReducer = combineReducers({
    audio: audioReducer,
    auth: authReducer,
    user: userReducer,
    ui: uiReducer,
});

// Enable Redux devtool in chrome only in dev mode
const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// class Player extends React.Component {

//     render() {
//         const { url, status, onFinishedPlaying } = this.props

//         return <Sound
//             url={url}
//             playStatus={status}
//             playFromPosition={30  /* in milliseconds */}
//             onLoading={this.handleSongLoading}
//             onPlaying={this.handleSongPlaying}
//             onFinishedPlaying={onFinishedPlaying}
//         />
//     }
// }

// class RootApp extends React.Component {

//     render() {
//         const { classes, theme, currTrack, status, onToggleStatus, onPreviousTrack, onNextTrack } = this.props;

//         return (
//             <Provider store={store}>
//                 <BrowserRouter>
//                     {/* <Player
//                         url={currTrack.url}
//                         status={status ? Sound.status.PLAYING : Sound.status.PAUSED}
//                         preloadType="auto"
//                         onFinishedPlaying={() => onNextTrack()}
//                     /> */}
//                     <App />
//                 </BrowserRouter>
//             </Provider>);

//     }
// }


// const mapStateToProps = state => {
//     return {
//         currTrack: state.audio.currTrack,
//         status: state.audio.playing,
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         onTryAutoSignup: () => dispatch(actions.authCheckState()),
//         onToggleStatus: () => dispatch(actions.togglePlayingStatus()),
//         onNextTrack: () => dispatch(actions.skipTrack(1))
//     };
// };



// ReactDOM.render(connect(mapStateToProps, mapDispatchToProps)(RootApp), document.getElementById('vitrnxSPA'));
// registerServiceWorker();

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('vitrnxSPA'));
registerServiceWorker();