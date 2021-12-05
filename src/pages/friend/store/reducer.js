import { ADD_SONGS, CLEAR_SONGLIST } from "./constant";

const initState = {
    songlist: [],
    songIndex: 0,
    current: {},
    songDetail: {},
    firstLoad: true,
    isPlay: false,
    aduRef: false
}
export default function reducer(state = initState, action) {
    let { songIndex, songlist, current, isPlay } = state;
    switch (action.type) {
        case 'PREVIOUS_SONG':
            songIndex = (songIndex - 1 + songlist.length) % (songlist.length);
            console.log('PREVIOUS', songIndex, 'state', state)
            // songIndex =  songIndex - 1;
            current = songlist[songIndex];
            return { ...state, songIndex}
        case 'NEXT_SONG':
            songIndex = (songIndex + 1 + songlist.length) % (songlist.length);
            console.log('NEXT', songIndex, 'state', state);
            // songIndex = songIndex + 1;
            current = songlist[songIndex];
            return { ...state, songIndex};
        case 'SWITCH': 
            return { ...state, isPlay: !isPlay};
        case ADD_SONGS: 
            songlist = [...songlist, ...action.newSonglist];
            console.log(songlist)
            return { ...state, songlist}
        case CLEAR_SONGLIST: 
            songlist = [];
            return { ...state, songlist};
        case 'getSongDetail':
            console.log('red27', action.songDetail)
            return { ...state, current: action.songDetail };
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
                songIndex = songlist.indexOf(action.songId);
                current = action.songDetail;
                console.log('playSongBySelect, but this song is included in songlist', state)
                return {...state, songIndex, current, isPlay: true };
            } else {
                current = action.songDetail;
                songlist = [...songlist, action.songId];
                songIndex = songlist.length - 1;

                state = { ...state, songlist, current, songIndex,  isPlay: true};
                console.log('playSongBySelect, success', state);
                return state;
            }
        default:
            return state;
    }
}