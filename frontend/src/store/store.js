import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import profileSlice from '../slices/profileSlice'
import settingSlice from '../slices/settingSlice'
import chatSlice from '../slices/chatSlice'

export const store = configureStore({
  reducer: {
    authReducer: authSlice,
    profileReducer: profileSlice,
    settingReducer:settingSlice,
    chatReducer:chatSlice
  },
});
