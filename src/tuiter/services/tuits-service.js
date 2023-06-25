import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;
const TUITS_API = `${API_BASE}/tuits`;
const API_KEY = process.env.YOUTUBE_API_KEY;

export const createTuit = async (tuit) => {
    const response = await axios.post(TUITS_API, tuit)
    return response.data;
}

export const findTuits = async () => {
    const response = await axios.get(TUITS_API);
    const tuits = response.data;
    return tuits;
}

export const deleteTuit = async (tid) => {
    const response = await axios.delete(`${TUITS_API}/${tid}`)
    return response.data
}

export const updateTuit = async (tuit) => {
    const response = await axios.put(`${TUITS_API}/${tuit._id}`, tuit);
    return tuit;
}

export const searchTuits = async (searchTerm) => {
    const response = await axios.get(`${TUITS_API}/search?q=${searchTerm}`);
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