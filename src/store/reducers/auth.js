import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    email: 'anonymous',
    displayName: 'anonymous',
    userRoles: [], // Arrays in redux must be initialised to an empty array rather than null.

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
        displayName: action.displayName,
        userRoles: action.userRoles,
        loading: false,
        error: null   
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        email: 'anonymous',
        displayName: 'anonymous',
        userRoles: [],
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { 
        token: null, 
        userId: null,
        email: 'anonymous', 
        displayName: 'anonymous',
        userRoles: [],
    });
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