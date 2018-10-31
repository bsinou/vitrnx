
import * as actionTypes from './actionTypes';
import { userCreate } from '.';

import fbaxios from 'axios';
import axios from '../../apiServer';



const apiPrefix = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/';
const secureTokenApiPrefix = 'https://securetoken.googleapis.com/v1/token?';

var apiKey = 'AIzaSyDCILPYnBaNiZ2BEInEMPpUZ4AZSuLQ1v8'
// var apiKey='A valid firebase API key'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, refreshToken, userId, email, displayName, userRoles) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        refreshToken: refreshToken,
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
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const registerAuthTimeout = (refreshToken, email, expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(refreshFbToken((expirationTime - 500) * 1000, email));
        }, 10 * 1000);
    };
    //         dispatch(logout());
};

export const fbRegister = (name, email, password, address) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = apiPrefix + 'signupNewUser?key=' + apiKey;
        fbaxios.post(url, authData)
            .then(response => {
                dispatch(updateLocalStorage(response.data.idToken, response.data.refreshToken, response.data.localId, response.data.expiresIn))
                dispatch(registerAuthTimeout(response.data.refreshToken, response.data.expiresIn));

                dispatch(userCreate(response.data.idToken, response.data.localId, name, email, address));
                dispatch(authSuccess(response.data.idToken, response.data.refreshToken, response.data.localId, email, name, ["GUEST"]));
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

                console.log('Auth success', response.data)
                dispatch(updateLocalStorage(response.data.idToken, response.data.refreshToken, response.data.localId, response.data.expiresIn))
                dispatch(registerAuthTimeout(response.data.refreshToken, response.data.expiresIn));

                dispatch(userMeta(response.data.idToken, response.data.refreshToken, response.data.localId));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const refreshFbToken = (refreshToken) => {
    return dispatch => {
        if (!refreshToken || refreshToken.length < 5)
            return; // Invalid refresh token, do nothing
        const authData = {
        };
        var options = {};
        let url = secureTokenApiPrefix + 'key=' + apiKey
            + '&grant_type=refresh_token&refresh_token=' + refreshToken;

        axios.post(url, authData, options)
            .then(response => {
                dispatch(updateLocalStorage(response.data.id_token, response.data.refresh_token, response.data.user_id, response.data.expires_in))
                dispatch(registerAuthTimeout(response.data.refresh_token, response.data.expires_in));
                dispatch(userMeta(response.data.id_token, response.data.refresh_token, response.data.user_id));
            })
            .catch(err => {
                console.log(err);
            });
    };
};


export const authCheckState = () => {

    // TODO: Also add refresh token mechanism
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

export const userMeta = (idToken, refreshToken, localId) => {
    return dispatch => {
        const authData = {
        };

        let url = 'auth/login';
        var options = { headers: { 'Authorization': idToken } };
        axios.post(url, authData, options)
            .then(response => {
                dispatch(authSuccess(idToken, refreshToken, localId, response.data.userMeta.email, response.data.userMeta.displayName, response.data.userMeta.userRoles));
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

export const updateLocalStorage = (token, refreshToken, userId, expiresIn) => {
    return dispatch => {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', token);
        localStorage.setItem('userId', userId);
        const expirationDate = new Date(new Date().getTime() + (expiresIn - 300) * 1000);
        localStorage.setItem('expirationDate', expirationDate);
    };
};

