import axios from "axios";
// const SERVER_API_URL = 'https://webdev-server-project.onrender.com/api';
// const USERS_URL = `${SERVER_API_URL}/users`;
const USERS_URL = 'http://localhost:4000/api/user';

const api = axios.create({ withCredentials: true });

export const login = async ({ username, password }) => {
    const response = await api.post(`${USERS_URL}/login`, { username, password });
    // console.log("login response: " + response.request)
    const user = response.data;
    return user;
};

export const logout = async () => {
    const response = await api.post(`${USERS_URL}/logout`);
    return response.data;
};

export const profile = async () => {
    const response = await api.get(`${USERS_URL}/profile`);
    // console.log("---------- get response")
    // console.log(response.data)
    return response.data;
};

export const updateUser = async (user) => {
    // console.log("--------- updateUser")
    // console.log(user)
    const response = await api.put(`${USERS_URL}`, user);
    return response.data;
};

export const register = async ({ username, password }) => {
    const response = await api.post(`${USERS_URL}/register`, { username, password });
    const user = response.data;
    return user;
}