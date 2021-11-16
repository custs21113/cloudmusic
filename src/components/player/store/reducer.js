// import { SONG_PLAYLIST_ID, SONG_INDEX } from '../../../common/constants';
// import { getSongDetail } from '../../../service/player';
// import { current } from './actionCreators';

const initState = {
    songlist: [],
    currentSongIndex: 0,
    currentSong: {},
    songDetail: {},
    firstLoad: true,
    isPlay: false,
    aduRef: false
}
export default function reducer(state = initState, action) {
    // let { songIndex} = action;
    let { currentSongIndex, songlist, currentSong } = state;
    switch (action.type) {
        case 'PREVIOUS':
            currentSongIndex = (currentSongIndex - 1 + songlist.length) % (songlist.length);
            console.log('red20', currentSongIndex, 'state', state)
            return { ...state, currentSongIndex, currentSong: action.currentSong }
        case 'NEXT':
            currentSongIndex = (currentSongIndex + 1 + songlist.length) % (songlist.length);
            console.log('red24', currentSongIndex, 'state', state)
            return { ...state, currentSongIndex, currentSong: action.currentSong }
        case 'getSongDetail':
            console.log('red27', action.songDetail)
            return { ...state, currentSong: action.songDetail };
        case 'addSongToList':
            // songIndex = songIndex ? songIndex : 0;
            if (songlist.includes(action.songId)) {
                console.log('addSongToList, but this song is included in songlist', state)
                return state;
            } else {
                state = { ...state, songlist: [...songlist, action.songId]};
                console.log('addSongToList, success', state);
                return state;
            }
        case 'playSongBySelect':
            if (songlist.includes(action.songId)) {
                currentSongIndex = songlist.indexOf(action.songId);
                currentSong = action.songDetail;
                console.log('playSongBySelect, but this song is included in songlist', state)
                return {...state, currentSongIndex, currentSong };
            } else {
                currentSong = action.songDetail;
                songlist = [...songlist, action.songId];
                currentSongIndex = songlist.length - 1;

                state = { ...state, songlist, currentSong, currentSongIndex};
                console.log('playSongBySelect, success', state);
                return state;
            }
        // case 'ADD_SONG_DETAIL':
        //     return { ...state, currentSong: action.songDetail };
        default:
            // console.log('state', state)
            return state;
    }
}