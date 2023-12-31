import { createSlice } from "@reduxjs/toolkit";
import { createTuitThunk, findTuitsThunk, updateTuitThunk, deleteTuitThunk, searchTuitsThunk } from "../services/tuits-thunks";
import { templateTuit } from "../templates/template-tuit";

const initialState = {
    tuits: [],
    loading: false,
    searchResults: [],
    youtubeSearchResults: []
}

const storedSearchResults = localStorage.getItem('searchResults');
if (storedSearchResults) {
    const parsedResults = JSON.parse(storedSearchResults);
    initialState.searchResults = parsedResults.tuits;
    initialState.youtubeSearchResults = parsedResults.youtube;
}

const tuitsSlice = createSlice({
    name: 'tuits',
    initialState,
    extraReducers: {
        [createTuitThunk.fulfilled]:
            (state, { payload }) => {
                payload = { ...templateTuit, ...payload }
                state.loading = false
                state.tuits.push(payload)
            },
        [findTuitsThunk.pending]:
            (state) => {
                state.loading = true
                state.tuits = []
            },
        [updateTuitThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                const tuitNdx = state.tuits.findIndex((t) => t._id === payload._id)
                state.tuits[tuitNdx] = { ...state.tuits[tuitNdx], ...payload }
            },
        [findTuitsThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.tuits = payload
            },
        [deleteTuitThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.tuits = state.tuits.filter(t => t._id !== payload)
            },
        [findTuitsThunk.rejected]:
            (state, action) => {
                state.loading = false
                state.error = action.error
            },
        [searchTuitsThunk.fulfilled]:
            (state, { payload }) => {
                state.searchResults = payload.tuits
                state.youtubeSearchResults = payload.youtube
                const storedResults = JSON.stringify(payload);
                localStorage.setItem('searchResults', storedResults);
            },
    },
    reducers: {}
});

export const { createTuit, deleteTuit } = tuitsSlice.actions;
export default tuitsSlice.reducer;