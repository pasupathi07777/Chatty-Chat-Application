import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/auth/update-profile`, credentials);
      return response.data;
    } catch (err) {
      const error = err.response?.data || { message: "Something went wrong" };
      return rejectWithValue(error);
    }
  }
);



const initialState = {
updateProfileLoading:false
};

export const profileSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder


      .addCase(updateProfile.pending, (state) => {
        state.updateProfileLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateProfileLoading = false;
        toast.success("updateProfile successful!");
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updateProfileLoading = false;
        toast.error(action.payload?.message || "updateProfile failed!");
      })




  },
});
export const profileState=state=>state.profileReducer
export default profileSlice.reducer;
