import * as constants from './constant';
import { login } from '../../../service/login';

const { LOGIN, LOGOUT } = constants;

export const loginAction = ({ phone, password }) => {
    return async dispatch => {
        try {
            let res = await login({ phone, password });
            return dispatch({
                type: LOGIN,
                ...res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const logoutAction = () => {
    return async dispatch => {
        try {
            return dispatch({
                type: LOGOUT
            })
        } catch (error) {
            console.log(error);
        }
    }
}
