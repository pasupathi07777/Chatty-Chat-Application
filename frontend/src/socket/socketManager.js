import { io } from "socket.io-client";
import { setOnlineUser } from "../slices/authSlice";

let socket = null;

// Connect to the socket server
export const connectSocket = (dispatch, userId) => {
  if (!socket) {
    socket = io("http://localhost:5001", {
      query: { userId },
    });

    socket.on("getOnlineUsers", (userIds) => {
      dispatch(setOnlineUser(userIds)); // Update the online users
    });
  }
};

// Disconnect the socket connection
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// Get the socket instance
export const getSocket = () => socket;

