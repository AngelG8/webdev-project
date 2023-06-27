import axios from "axios";
// const SERVER_API_URL = process.env.REACT_APP_API_BASE;
const SERVER_API_URL = 'http://localhost:4000/api';
const USERS_URL = `${SERVER_API_URL}/user`;

const api = axios.create({ withCredentials: true });

export const login = async ({ username, password }) => {
    const response = await api.post(`${USERS_URL}/login`, { username, password });
    const user = response.data;
    return user;
};

export const logout = async () => {
    const response = await api.post(`${USERS_URL}/logout`);
    return response.data;
};

export const profile = async () => {
    const response = await api.get(`${USERS_URL}/profile`);
    return response.data;
};

export const updateUser = async (user) => {
    const response = await api.put(`${USERS_URL}`, user);
    return response.data;
};

export const updateUserById = async (user) => {
    const response = await api.put(`${SERVER_API_URL}/otheruser`, user);
    return response.data;
};

export const register = async ({ username, password, firstName, lastName, role, email , phone, avatar }) => {
    const response = await api.post(`${USERS_URL}/register`, { username, password , firstName, lastName, role, email , phone, avatar});
    const user = response.data;
    return user;
}