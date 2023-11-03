import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/Login/pages/ForgotPassword/ForgotPassword";
import Login from "./pages/Login/pages/Login/Login";
import QR from "./pages/Signup/pages/QR/QR";
import Signup from "./pages/Signup/pages/Signup/Signup";
import OTP from "./pages/Login/pages/OTP/OTP";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'

function App() {

  const ProtectedRoute = ({ children }) => {
    const loggedIn = localStorage.getItem("loggedIn")
    if (loggedIn) {
      console.log("User is already logged in")
      return <Navigate to="/" replace />;
    }
    return children;
  };

  const ProtectedQRRoute = ({ children }) => {
    const qr = localStorage.getItem("qr")
    if (qr == null) {
      console.log("Missing QR code")
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const ProtectedOTPRoute = ({ children }) => {

    const username = localStorage.getItem("username")
    console.log(username)
    if (username == null) {
      console.log("User not set for OTP")
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<ProtectedRoute><Login/></ProtectedRoute>} />
          <Route path="/forgot-password" element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>} />
          <Route path="/signup" element={<ProtectedRoute><Signup /></ProtectedRoute>} />
          <Route path='/qr' element={<ProtectedQRRoute><QR /></ProtectedQRRoute>} />
          <Route path="/otp" element={<ProtectedOTPRoute><OTP /></ProtectedOTPRoute>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App