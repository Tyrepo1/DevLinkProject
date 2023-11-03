import Popup from '../../../../components/Popup';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../../../../api/Login/loginAPI';
import LoginForm from '../../components/Login/LoginForm';
import "../../styles/Login.css";

function Login() {

  const navigate = useNavigate()

  const [isOpen, setOpen] = useState(false)
  const [message, setMessage] = useState("Empty message")

  const handleFormSubmit = async (data) => {
    setOpen(false)
    loginUser(data)
      .then((result) => {
        console.log(result)
        if(result.success){
          localStorage.setItem("username", data.name)
          if(result.qr){
            console.log("GGYKW: " + localStorage.getItem("username"))
            navigate("/otp")
          }
          else{
            navigate("/")
          }
        }else{
          setMessage(result.message)
          setOpen(true)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const handleSignup = () => {
    navigate("/signup")
  }
  const closePopup = () =>{
    setOpen(false)
  }

  return (
    
    <div>
      <Popup isOpen={isOpen} closePopup={closePopup} children={message} severity="error" />
      <div className='flex items-center justify-center h-screen'>
        <LoginForm onSubmitForm={handleFormSubmit} onSignup={handleSignup}/>
      </div>
      
    </div>
  )
}

export default Login