import * as constants from './constant';
import { getSD } from '../../../service/player';

export const changeCurrentSongAction = (currentSong) => ({
    type: constants.CHANGE_CURRENT_SONG,
    currentSong
})

export const changeSongIndexAction = (index) => {
    return {
        type: constants.CHANGE_CURRENT_SONG_INDEX,
        index
    }
}

// export const previous = () => ({
//     type: constants.PREVIOUS
// })

// export const next = () => ({
//     type: constants.NEXT
// })

// export const changeFirstLoad = (isFirstLoad) => ({
//     type: 'CHANGE_PLAY_LIST_LOAD',
//     isLoad: isFirstLoad
// })
export const addSongToList = (songId) => {
    return async dispatch => {
        try {
            console.log('songId', songId);
            let res = await getSD(songId);
            let { ar, al: { picUrl }, mv, id, name, dt } = res.data.songs[0];
            let songDetail = { ar, al: { picUrl }, mv, id, name, dt };
            return dispatch({
                type: "addSongToList",
                songId,
                songDetail
            })
        } catch (error) {
            console.log('ac40', error)
        }
    }
}
export const playSongBySelect = (songId) => {
    return async dispatch => {
        try {
            console.log()
            let res = await getSD(songId);
            let { ar, al: { picUrl }, mv, id, name, dt } = res.data.songs[0];
            let songDetail = { ar, al: { picUrl }, mv, id, name, dt };
            return dispatch({
                type: 'playSongBySelect',
                songId,
                songDetail
            })
        } catch (error) {
            console.log(error)
        }
    }
}
// export const addSong = (songId) => {
//     return dispatch => {
//         dispatch({
//             type: "ADD_SONG",
//             songId
//         })

//     }
// }
// export const addSongDetail = (songId) => {
//     return async dispatch => {
//         let res = await getSD(songId);
//         let { ar, al: { picUrl }, mv, id, name, dt } = res.data.songs[0];
//         let songDetail = { ar, al: { picUrl }, mv, id, name, dt };
//         dispatch({
//             type: "ADD_SONG_DETAIL",
//             songDetail
//         })
//     }
// }
export const playSongById = (tag) => {
    return async (dispatch, getState) => {
        let state = getState()["player"];
        let { songlist, currentSongIndex } = state;
        currentSongIndex = (currentSongIndex + songlist.length + tag) % songlist.length;
        console.log('playSongById_ac34', state);
        let res = await getSD(songlist[currentSongIndex]);
        let { ar, al: { picUrl }, mv, id, name, dt } = res.data.songs[0];
        let currentSong = { ar, al: { picUrl }, mv, id, name, dt };
        switch (tag) {
            case -1:
                return dispatch({ type: constants.PREVIOUS, currentSong })
            default:
                return dispatch({ type: constants.NEXT, currentSong});
        }
    }
}

// export const changeCurrentSong = (idx) => {
//     return async dispatch => {
//         let res = await getSD(idx);
//         console.log(52, res)
//         let { ar, al: { picUrl }, mv, id, name, dt } = res.data.songs[0];

//         let currentSong = { ar, al: { picUrl }, mv, id, name, dt };
//         dispatch({ type: 'getSongDetail', currentSong })
//     }
// }

// export const changePlayListAction = (playlist) =>({
//     type: constants.CHANGE_PLAY_LIST,
//     playlist
// })

// export const changeLyricAction = (lyric) => ({
//     type: constants.CHANGE_LYRIC_LIST,
//     lyric
// })