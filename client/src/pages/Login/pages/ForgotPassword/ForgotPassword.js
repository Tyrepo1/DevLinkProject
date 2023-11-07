import React from 'react'
import ForgotForm from '../../components/ForgotPassword/ForgotForm'
import "../../styles/Login.css"
import Popup from '../../../../components/Popup'
import { findUser } from '../../../../api/ForgotPassword/forgotPasswordAPI'
import backgroundImage from '../../../../images/background.png'


import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ForgotPassword() {

  const navigate = useNavigate()

  const [isOpen, setOpen] = useState(false)
  const [message, setMessage] = useState("Empty message")
  const [loading, setLoading ] = useState(false)

  const closePopup = () => {
    setOpen(false)
  }

  const handleFormSubmit = (data) => {
    closePopup()
    setLoading(true)
    if(!!data.nameAndEmail){
      findUser(data.nameAndEmail)
        .then((result) => {
          console.log(result)
          if(result.success){
            localStorage.setItem("username", result.message)
            localStorage.setItem("otp", true)
            if(result.email){
              navigate("/otp", { state: { alertMessage: "An email has been sent to the email linked with the account. Please scan the QR code in the email with the Authenticator app to get your OTP and enable 2FA" } })
              return;
            }
            navigate("/otp")
            return;
          }else{
            setMessage(result.message)
            setOpen(true)
          }
        }).finally(
          setLoading(false)
        )
    }
    
  }
  return (
    <div>
      <img className=' absolute w-screen h-screen -z-50' src={backgroundImage} alt='Background'/>
      <Popup isOpen={isOpen} closePopup={closePopup} children={message} severity="error" />
      <div className='flex items-center justify-center h-screen'>
        <ForgotForm onSubmitForm={handleFormSubmit}loading={loading}/>
      </div>
      
    </div>
  )
}

export default ForgotPassword