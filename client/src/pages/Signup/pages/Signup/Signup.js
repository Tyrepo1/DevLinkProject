import React, { useState, useContext } from 'react'
import SignupForm from '../../components/Signup/SignupForm';
import "../../styles/Signup.css"
import { useNavigate } from "react-router-dom";
import { saveUser } from '../../../../api/Signup/signupAPI';
import Popup from '../../../../components/Popup';

function Signup() {

  const navigate = useNavigate()

  const [isOpen, setOpen] = useState(false)
  const [message, setMessage] = useState("Empty message")
  const [success, setSuccess] = useState(false)
  const [qr, setQR] = useState(false)

  const handleFormSubmit = (data) => {
    if (!!data.email && !!data.name && !!data.password) {
      saveUser(data)
        .then((result) => {
          setSuccess(result.success)
          setQR(result.qr)
          if (!result.success) {
            setMessage(result.message)
            setOpen(true)
          } else if(result.qr) {
            localStorage.setItem("qr", result.message);
            setMessage("Please scan youre 2FA QR code in the next screen")
            setOpen(true)
          } else{
            setMessage(result.message)
            setOpen(true)
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  const closePopup = () => {
    setOpen(false)
    if(success){
      if(qr){
        navigate("/qr")
      }else{
        navigate("/login")
      }
      
    }
  }
  return (
    <div>
      <Popup isOpen={isOpen} closePopup={closePopup} children={message} />
      <div className='LoginForm'>
        <SignupForm onSubmitForm={handleFormSubmit} onSignup={null}/>
      </div>
      
    </div>
  )
}

export default Signup