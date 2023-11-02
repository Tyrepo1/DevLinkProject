import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/pages/Login/Login";
import ForgotPassword from "./pages/Login/pages/ForgotPassword/ForgotPassword";
import Signup from "./pages/Signup/pages/Signup/Signup";
import QR from "./pages/Signup/pages/QR";

function App() {

  //Prevent protected routes from being accessed by non logged in users
  const ProtectedRoute = ({ children }) => {
    const username = localStorage.getItem("username")
    if (username == null) {
      console.log("User not logged in!")
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/qr' element={
            <ProtectedRoute>
              <QR />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
  )
}

export default App