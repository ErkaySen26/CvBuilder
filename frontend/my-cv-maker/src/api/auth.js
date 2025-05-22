import axios from 'axios';
const AUTH_BASE_URL = 'https://cvcim.xyz/auth'; // ✅ doğrudan base
export const login = (data) => {
    return axios.post(`${AUTH_BASE_URL}/authenticate`, data); // ✅
};
export const registerUser = (data) => {
    return axios.post(`${AUTH_BASE_URL}/register`, data); // ✅
};
