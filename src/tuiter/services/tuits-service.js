import axios from 'axios';

// const API_BASE = process.env.REACT_APP_API_BASE;
const API_BASE = 'http://localhost:4000/api';
const TUITS_API = `${API_BASE}/tuits`;
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
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
    return response.data;
}

export const findOtherTuits = async (uid) => {
    const response = await api.get(`${API_BASE}/myTuits/${uid}`);
    return response.data;
}

export const searchTuits = async (searchTerm) => {
    const response = await api.get(`${API_BASE}/search?q=${searchTerm}`);
    const searchResults = response.data;
    return searchResults;
};

export const searchYouTubeVideos = async (searchTerm) => {
    const API_URL = 'https://www.googleapis.com/youtube/v3/search';

    try {
        const response = await axios.get(API_URL, {
            params: {
                key: API_KEY,
                part: "snippet",
                q: searchTerm,
                type: 'video',
                maxResult: 10,
            },
        });

        const searchResults = response.data.items;
        return searchResults;
    } catch (error) {
        console.error('Error searching YouTube videos:', error);
        throw error;
    }
};
