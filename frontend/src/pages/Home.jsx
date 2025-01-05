import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { chatState } from '../slices/chatSlice';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';
import NoChatSelect from '../components/NoChatSelect';
const Home = () => {
  const { selectedUser } = useSelector(chatState);
  const dispatch = useDispatch();
  return (
    <div className="h-screen bg-base-200 w-full">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelect/> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
