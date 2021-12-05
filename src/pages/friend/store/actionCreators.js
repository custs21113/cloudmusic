import * as constants from './constant';
import { login } from '../../../service/login';

const { LOGIN, LOGOUT, NEXT, PREVIOUS, SWITCH, ADD_SONGS, CLEAR_SONGLIST } = constants;

export const switchSong = () => {
    return dispatch => {
        try {
            return dispatch({
                type: SWITCH
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const previousSong = () => {
    return dispatch => {
        try {
            return dispatch({
                type: PREVIOUS
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export const nextSong = () => {
    return dispatch => {
        try {
            return dispatch({
                type: NEXT
            });
        } catch(error) {
            console.log(error);
        }
    }
}

export const addSongs = (newSonglist) => {
    return dispatch => {
        try {
            return dispatch({
                type: ADD_SONGS,
                newSonglist
            })
        } catch(error) {
            console.log(error);
        }
    }
}

export const clearSonglist = () => {
    return dispatch => {
        try {
            return dispatch({
                type: CLEAR_SONGLIST
            })
        } catch(error) {
            console.log(error);
        }
    }
}