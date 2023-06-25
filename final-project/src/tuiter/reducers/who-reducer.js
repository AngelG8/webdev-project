import { createSlice } from "@reduxjs/toolkit";
import whoArray from "./who.json";
import {
  findWhoToFollowListThunk,
} from "../services/who-thunks";

const initialState = {
    whoToFollowList: [],
    loading: false
}

const whoToFollowListSlice = createSlice({
    name: 'whoToFollowList',
    initialState,
    extraReducers: {
        [findWhoToFollowListThunk.pending]:
            (state) => {
                state.loading = true
                state.whoToFollowList = []
            },
        [findWhoToFollowListThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.whoToFollowList = payload
            },
        [findWhoToFollowListThunk.rejected]:
            (state, action) => {
                state.loading = false
                state.whoToFollowList = action.error
            }
    },
    reducers: {}
});

export default whoToFollowListSlice.reducer;