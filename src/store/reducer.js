import { combineReducers } from "redux";
import { reducer as playerReducer } from '../components/player/store';
import countReducer  from '../components/redux-test/store';
import { reducer as loginReducer } from '../components/header/store';
import { reducer as friendReducer } from '../pages/friend/store';
const reducer = combineReducers({
    player: playerReducer,
    count: countReducer,
    login: loginReducer,
    friend: friendReducer
})

export default reducer;