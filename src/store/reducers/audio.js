import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

import { PLTracks } from "../../assets/conf/playList.jsx";

// function getURI(fName) {
//     return 'musicRepo/Radio/' + encodeURI(fName);
// }

const initialState = {
    comingDialogOpen: false,
    tracks: PLTracks, 
    currTrack: PLTracks[0],
    currPlaying: 0,
    playing: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUDIO_TOGGLE_PLAYING_STATUS: return togglePlayingStatus(state, action);
        case actionTypes.AUDIO_SKIP_TRACK: return loadTrack(state, action);
        case actionTypes.AUDIO_FORCE_PAUSE: return forcePause(state, action);    
        default:
            return state;
    }
};

const togglePlayingStatus = (state, action) => {
    return updateObject(state, {
        playing: !state.playing,
    });
};

const forcePause = (state, action) => {
    return updateObject(state, {
        playing: false,
    });
};

const loadTrack = (state, action) => {
    let newIndex = state.currPlaying + action.direction;
    // Not very elegant way of working around negative numbers.
    newIndex += state.tracks.length;
    newIndex = newIndex % state.tracks.length
    return updateObject(state, {
        currPlaying: newIndex,
        currTrack: state.tracks[newIndex]
    });
};

export default reducer;
