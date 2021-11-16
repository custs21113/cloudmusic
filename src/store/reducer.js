import { combineReducers } from "redux";
import { reducer as playerReducer } from '../components/player/store';
import countReducer  from '../components/redux-test/store';
import { reducer as loginReducer } from '../components/header/store';
const reducer = combineReducers({
    player: playerReducer,
    count: countReducer,
    login: loginReducer,
})

export default reducer;