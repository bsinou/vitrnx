import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    email: 'anonymous',

    authRedirectPath: '/',
    loading: false,
    error: null
};

const authStart = ( state, action ) => {
    return updateObject( state, { loading: true, error: null } );
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.token,
        userId: action.userId,
        email: action.email,
        loading: false,
        error: null   
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        email: 'anonymous',
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { email: 'anonymous', token: null, userId: null });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default:
            return state;
    }
};

export default reducer;