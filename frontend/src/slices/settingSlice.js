import {  createSlice } from "@reduxjs/toolkit";





const initialState = {
    theme:localStorage.getItem("app-theam")|| "light"
};

export const settingSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setTheme: (state,action)=>{
         localStorage.setItem("app-theam",action.payload)
        state.theme= localStorage.getItem("app-theam")
    }
  },

});
export const settingState=state=>state.settingReducer
export const {setTheme}=settingSlice.actions
export default settingSlice.reducer;
