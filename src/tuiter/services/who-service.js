import axios from 'axios';

// const API_BASE = process.env.REACT_APP_API_BASE;
const API_BASE = 'http://localhost:4000/api';
const WHO_API = `${API_BASE}/users`;

const api = axios.create({ withCredentials: true });

export const findAllUsers = async () => {
    const response = await api.get(WHO_API);
    const allUsers = response.data;
    return allUsers;
}

export const findUserById = async (uid) => {
    const response = await api.get(`${WHO_API}/${uid}`);
    const user = response.data;
    return user;
}
