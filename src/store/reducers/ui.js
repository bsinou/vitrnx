import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    comingDialogOpen: false,
};
 
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.UI_OPEN_COMING_DIALOG: return openComingDialog(state, action);
        case actionTypes.UI_CLOSE_COMING_DIALOG: return closeComingDialog(state, action);
        default:
            return state;
    }
};

const openComingDialog = (state, action) => {
    return updateObject( state, { 
        comingDialogOpen: true,
     } );
};

const closeComingDialog = (state, action) => {
    return updateObject( state, { 
        comingDialogOpen: false,
     } );
};

export default reducer;
