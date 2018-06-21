
import * as actionTypes from './actionTypes';

export const togglePlayingStatus = () => {
    return {
        type: actionTypes.AUDIO_TOGGLE_PLAYING_STATUS,
    };
};

export const forcePause = () => {
    return {
        type: actionTypes.AUDIO_FORCE_PAUSE,
    };
};

export const skipTrack = (dir) => {
    return {
        type: actionTypes.AUDIO_SKIP_TRACK,
        direction: dir,
    };
};
