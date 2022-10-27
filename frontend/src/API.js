import axios from 'axios';

export const API = axios.create({
    baseURL: 'https://red-violet-centipede-boot.cyclic.app',
});

API.interceptors.request.use(req => {
    if (localStorage.getItem("userInfo")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`;
    }
    return req;
});