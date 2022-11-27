import axios from 'axios';
import { LOCAL_URL, TIME_OUT } from './config';

const instance = axios.create({
    baseURL: LOCAL_URL,
    timeout: TIME_OUT,
    headers: {},
    withCredentials: true
});


export default instance;