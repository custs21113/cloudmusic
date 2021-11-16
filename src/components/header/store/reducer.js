import { LOGIN, LOGOUT } from "./constant";
// import { getSongDetail } from '../../../service/player';
// import { current } from './actionCreators';

const initState = {
    isLogin: false,
    account: {},
    profile: {}
}
export default function reducer(state = initState, action) {
    // let { songIndex} = action;
    // let { currentSongIndex, songlist, currentSong } = state;
    switch (action.type) {
        case LOGIN:
            // currentSongIndex = (currentSongIndex - 1 + songlist.length) % (songlist.length);
            let { account, profile } = action;
            return { ...state, isLogin: true, account, profile }
        case LOGOUT: 
            return {...initState}
        default:
            // console.log('state', state)
            return state;
    }
}