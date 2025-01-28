import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingPage from './pages/SettingPage'
import ProfilePage from './pages/ProfilePage'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from 'lucide-react';
import { Toaster } from "react-hot-toast";
import { authState, verifyAuth } from './slices/authSlice'
import Navbar from './components/Navbar'
import { settingState } from './slices/settingSlice'
import { getUsers, subScribeToMessages } from './slices/chatSlice'

const App = () => {
  const dispatch = useDispatch()
  const { signupLoading, authUser, onlineUsers, verifyAuthLoading } =
    useSelector(authState);
   const {theme}=useSelector(settingState)
   const navigation=useNavigate()




  useEffect(() => {
    dispatch(verifyAuth());
    dispatch(getUsers());

  }, [dispatch]);


  return (

    <div
      data-theme={theme}
      className="flex justify-center flex-col items-center min-h-screen "
    >
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={
            !authUser ? (
              <SignUpPage navigation={navigation} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App
