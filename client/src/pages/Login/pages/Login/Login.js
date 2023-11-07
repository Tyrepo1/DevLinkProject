import Popup from '../../../../components/Popup';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../../../../api/Login/loginAPI';
import LoginForm from '../../components/Login/LoginForm';
import "../../styles/Login.css";
import backgroundImage from '../../../../images/background.png'

function Login() {

  const navigate = useNavigate()

  const [isOpen, setOpen] = useState(false)
  const [message, setMessage] = useState("Empty message")
  const [loading, setLoading] = useState(false)

  const handleFormSubmit = async (data) => {
    setOpen(false)
    setLoading(true)
    loginUser(data)
      .then((result) => {
        console.log(result)
        if(result.success){
          localStorage.setItem("username", data.name)
          if(result.qr){
            localStorage.setItem("otp", true)
            navigate("/otp")
          }
          else{
            localStorage.setItem("loggedIn", true)
            navigate("/")
          }
        }else{
          setMessage(result.message)
          setOpen(true)
        }
      })
      .catch((error) => {
        setMessage("An unexpected error has appeared")
        setOpen(true)
        console.error(error);
      }).finally(
        setLoading(false)
      );
  }
  const handleSignup = () => {
    navigate("/signup")
  }
  const closePopup = () =>{
    setOpen(false)
  }

  return (
    
    <div>
      <img className=' absolute w-screen h-screen -z-50' src={backgroundImage} alt='Background'/>
      <Popup isOpen={isOpen} closePopup={closePopup} children={message} severity="error" />
      <div className='flex items-center justify-center h-screen'>
        <LoginForm onSubmitForm={handleFormSubmit} onSignup={handleSignup} loading={loading}/>
      </div>
      
    </div>
  )
}

export default Login