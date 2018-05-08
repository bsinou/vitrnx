
import * as actionTypes from './actionTypes';
import { userCreate } from '.';

import fbaxios from 'axios';
import axios from '../../apiServer';



const apiPrefix = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/';
var apiKey = 'AIzaSyBTPRFJmUcdrezg4goOtBSVBt5JEJINm1Y'
// var apiKey='A valid firebase API key'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, email, displayName, userRoles) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
        email: email,
        displayName: displayName,
        userRoles: userRoles
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const registerAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const fbRegister = (name, email, password, address) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        // console.log('About to send auth request', url);
        let url = apiPrefix + 'signupNewUser?key=' + apiKey;
        fbaxios.post(url, authData)
            .then(response => {
                dispatch(updateLocalStorage(response.data.idToken, response.data.localId, response.data.expiresIn))
                dispatch(registerAuthTimeout(response.data.expiresIn));

                dispatch(userCreate(response.data.idToken, response.data.localId, name, email, address));
                dispatch(authSuccess(response.data.idToken, response.data.localId, email, name, ["GUEST"]));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            });
    };
};

// Try to login via Firebase. TODO directly to this from the Go Backend
export const fbAuth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = apiPrefix + 'verifyPassword?key=' + apiKey;
        fbaxios.post(url, authData)
            .then(response => {
                dispatch(updateLocalStorage(response.data.idToken, response.data.localId, response.data.expiresIn))
                dispatch(registerAuthTimeout(response.data.expiresIn));

                dispatch(userMeta(response.data.idToken, response.data.localId, email));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(userMeta(token, userId));
            }
        }
    };
};

export const userMeta = (idToken, localId) => {
    return dispatch => {
        const authData = {
        };

        let url = 'auth/login';
        var options = { headers: { 'Authorization': idToken } };
        axios.post(url, authData, options)
            .then(response => {
                dispatch(authSuccess(idToken, localId, response.data.userMeta.email, response.data.userMeta.displayName, response.data.userMeta.userRoles));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail('could not get vitrnx specific infos'));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const updateLocalStorage = (token, userId, expiresIn) => {
    return dispatch => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        localStorage.setItem('expirationDate', expirationDate);
    };
};

