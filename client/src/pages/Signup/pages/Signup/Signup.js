import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { saveUser } from '../../../../api/Signup/signupAPI';
import Popup from '../../../../components/Popup';
import SignupForm from '../../components/Signup/SignupForm';
import "../../styles/Signup.css";
import backgroundImage from '../../../../images/background.png'

function Signup() {

  const navigate = useNavigate()

  const [isOpen, setOpen] = useState(false)
  const [message, setMessage] = useState("Empty message")
  const [severity, setSeverity] = useState("error")
  const [loading, setLoading] = useState(false)

  const handeSignIn = () => {
    navigate("/login")
  }

  const handleFormSubmit = (data) => {
    setOpen(false)
    setLoading(true)
    if (!!data.email && !!data.name && !!data.password) {
      saveUser(data)
        .then((result) => {
          if (!result.success) {
            setSeverity("error")
            setMessage(result.message)
            setOpen(true)
          } else if(result.qr) {
            localStorage.setItem("qr", result.message);
            navigate("/qr", { state: { alertMessage: "Please scan the QR code below with the Authenticator app to get your OTP code" } })
          } else{
            navigate("qr")
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
  }

  const closePopup = () => {
    setOpen(false)
  }
  return (
    <div>
      <img className=' absolute w-screen h-screen -z-50' src={backgroundImage} alt='Background'/>
      <Popup isOpen={isOpen} closePopup={closePopup} children={message} severity={severity} />
      <div className='flex items-center justify-center h-screen'>
        <SignupForm onSubmitForm={handleFormSubmit} onSignup={handeSignIn} loading={loading}/>
      </div>
      
    </div>
  )
}

export default Signup