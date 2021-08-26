import * as actionTypes from './actionTypes';

const increment = (action)=>({
  type: actionTypes.INCREMENT,
  data: action.data
})
const decrement = (action)=>({
  type: actionTypes.DECREMENT,
  data: action.data
})

export {increment, decrement}
// import * as contants from './constants';

// const changeCurrentSongAction = (currentSong) => ({
//     type: actionType.CHANGE_CURRENT_SONG,
//     currentSong,
//   })