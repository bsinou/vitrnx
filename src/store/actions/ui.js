

import * as actionTypes from './actionTypes';

export const openComingDialog = () => {
    return {
        type: actionTypes.UI_OPEN_COMING_DIALOG,
    };
};

export const closeComingDialog = () => {
    return {
        type: actionTypes.UI_CLOSE_COMING_DIALOG,
    };
};
