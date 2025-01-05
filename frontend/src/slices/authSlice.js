import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/auth/signup`, credentials);
      return response.data;
    } catch (err) {
      const error = err.response?.data || { message: "Something went wrong" };
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/auth/login`, credentials);
      return response.data;
    } catch (err) {
      const error = err.response?.data || { message: "Something went wrong" };
      return rejectWithValue(error);
    }
  }
);


export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/auth/logout`, _);
      return response.data;
    } catch (err) {
      const error = err.response?.data || { message: "Something went wrong" };
      return rejectWithValue(error);
    }
  }
);


export const verifyAuth = createAsyncThunk(
  "auth/verifyAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/auth/check`, _);
      return response.data;
    } catch (err) {
      const error = err.response?.data || { message: "Something went wrong" };
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  verifyAuthLoading:false,
  signupLoading: false,
  loginLoading: false,
  logoutLoading: false,
  authUser: {
    fullName:"pasupathi",
    email:"pasupathifeather@gmail.com"
  },
  onlineUsers: [],
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.signupLoading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.signupLoading = false;
        toast.success("Signup successful!");
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signupLoading = false;
        toast.error(action.payload?.message || "Signup failed!");
      })

      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.authUser=true
        toast.success("Login successful!");

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        toast.error(action.payload?.message || "Signup failed!");
      })


      .addCase(logout.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.logoutLoading = false;
        state.authUser=null
        toast.success("Logout successful!");
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutLoading = false;
        toast.error(action.payload?.message || "Logout failed!");
      })


      .addCase(verifyAuth.pending, (state) => {
        state.verifyAuthLoading = true;
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        state.verifyAuthLoading = false;
        state.authUser=action.payload.user
        console.log(action.payload)
        console.log(state.authUser)
        

      })
      .addCase(verifyAuth.rejected, (state, action) => {
        state.verifyAuthLoading = false;

      });


  },
});
export const authState=state=>state.authReducer
export default signupSlice.reducer;
