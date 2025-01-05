import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const getUsers = createAsyncThunk(
    "mess/getUsers",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`/messages/users`);
        return response.data;
      } catch (err) {
        const error = err.response?.data || { message: "Something went wrong" };
        return rejectWithValue(error);
      }
    }
  );


export const getMessages = createAsyncThunk(
    "mess/getMessages",
    async (credentials, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post(`/messages/${credentials}`);
        return response.data;
      } catch (err) {
        const error = err.response?.data || { message: "Something went wrong" };
        return rejectWithValue(error);
      }
    }
  );


export const sentMessage = createAsyncThunk(
    "mess/sentMessage",
    async (credentials, { rejectWithValue }) => {
      const {id,data}=credentials
      try {
        const response = await axiosInstance.post(`/messages/send/${id}`,data);
        return response.data;
      } catch (err) {
        const error = err.response?.data || { message: "Something went wrong" };
        return rejectWithValue(error);
      }
    }
  );






const initialState = {
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false 
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedUser:(state,action)=>{
      state.selectedUser=action.payload

    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isUserLoading = false;
        console.log(action.payload);
        state.users=action.payload
        
     
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isUserLoading = false;
 
      })


      .addCase(getMessages.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isMessagesLoading = false;
        state.messages=action.payload


      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isMessagesLoading = false;

      })


      .addCase(sentMessage.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(sentMessage.fulfilled, (state, action) => {
        state.isMessagesLoading = false;
        state.messages=[...state.messages,action.payload]
    
      })
      .addCase(sentMessage.rejected, (state, action) => {
        state.isMessagesLoading = false;

   
      })
  },

});
export const chatState=state=>state.settingReducer
export const {setSelectedUser}=chatSlice.actions
export default chatSlice.reducer;
