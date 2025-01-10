
import { io } from "socket.io-client";
import { setOnlineUser } from "../slices/authSlice";

let socket = null;

export const connectSocket = (dispatch,userId) => {
    console.log(userId);
    
  if (!socket) {
    socket = io("http://localhost:5001", {
      query: { userId },
    });

    socket.on("getOnlineUsers", (userIds) => {
      console.log("Online users:", userIds);
      dispatch(setOnlineUser(userIds))

    });
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
