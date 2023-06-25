import axios from 'axios';
const API_BASE = 'http://localhost:4000/api';
const TUITS_API = `${API_BASE}/tuits`;

const api = axios.create({ withCredentials: true });


export const createTuit = async (tuit) => {
    const response = await api.post(TUITS_API, tuit)
    return response.data;
}

export const findTuits = async () => {
    const response = await api.get(TUITS_API);
    const tuits = response.data;
    return tuits;
}

export const deleteTuit = async (tid) => {
    const response = await api.delete(`${TUITS_API}/${tid}`)
    return response.data
}

export const updateTuit = async (tuit) => {
    const response = await api.put(`${TUITS_API}/${tuit._id}`, tuit);
    return tuit;
}
export const findMyTuits = async () => {
    const response = await api.get(`${API_BASE}/myTuits`);
    // console.log("findMytuits" + response.data)
    return response.data;
}