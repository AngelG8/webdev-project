import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./who-service";

export const findWhoThunk = createAsyncThunk(
    "who/allUsers",
    async () => {
      const allUsers = await service.findAllUsers()
      console.log("allUsers")
      console.log(allUsers)
      return allUsers
    }
);

