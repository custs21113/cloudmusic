import { combineReducers } from "redux";
import { reducer as playerReducer } from '../components/player/store';
import countReducer  from '../components/redux-test/store';
const reducer = combineReducers({
    player: playerReducer,
    count: countReducer
})

export default reducer;