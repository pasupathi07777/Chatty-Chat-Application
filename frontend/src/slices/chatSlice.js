import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";
import { getSocket } from "../socket/socketManager";

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
      const response = await axiosInstance.get(`/messages/${credentials}`);
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
    const { id, data } = credentials;
    try {
      const response = await axiosInstance.post(`/messages/send/${id}`, data);
      return response.data;
    } catch (err) {
      const error = err.response?.data || { message: "Something went wrong" };
      return rejectWithValue(error);
    }
  }
);

export const subScribeToMessages = () => (dispatch, getState) => {
  const state = getState();
  const { selectedUser } = state.chatReducer;
  if (!selectedUser) return;
  console.log(selectedUser);

  const socket = getSocket();
  if(!socket) return;

  socket.on("newMessage", (newMessage) => {
    if(!newMessage) return;
    if (newMessage.senderId !== selectedUser._id) return;
    console.log(newMessage);
    dispatch(addMessage(newMessage));
  });
};

export const unSubScribeToMessages = () => (dispatch, getState) => {
  const socket = getSocket();
  if(!socket) return; 
  socket.off("newMessage");
};

// Initial state
const initialState = {
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;  // this is the user id  
      // state.selectedUser = state.users.find(
      //   (user) => user._id === action.payload
      // );
    },
    addMessage: (state, action) => {
      console.log(action.payload);

      state.messages = [...state.messages, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isUserLoading = false;
      })

      .addCase(getMessages.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isMessagesLoading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state) => {
        state.isMessagesLoading = false;
      })

      .addCase(sentMessage.fulfilled, (state, action) => {
        state.messages = [...state.messages, action.payload];
      });
  },
});

export const { setSelectedUser, addMessage } = chatSlice.actions;
export const chatState = (state) => state.chatReducer;
export default chatSlice.reducer;
