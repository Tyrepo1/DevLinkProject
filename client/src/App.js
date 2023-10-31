import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/pages/Login/Login";
import ForgotPassword from "./pages/Login/pages/ForgotPassword/ForgotPassword";

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App