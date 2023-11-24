import axios from 'axios';
// import Cookies from 'js-cookie';
const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
    // timeout: 1000,
    // headers: {
    //     // 'Content-Type': 'application/json',
    //     // 'Access-Control-Allow-Origin': '*',
    // },
});


export const getAllUSer = () => {
    return api.get('/api-get-all-users')
}