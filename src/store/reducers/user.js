import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const userCreate = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const userDelete = (state, action) => {
};
 
export  default userCreate;