import React from 'react';
import { validateOTP } from '../../../../api/Login/loginAPI';
import OTPForm from '../../components/OTP/OTPForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../../../../components/Popup';

function OTP() {

    const navigate = useNavigate()

    const [isOpen, setOpen] = useState(false)
    const [message, setMessage] = useState("Empty message")

    const closePopup = () => {
        setOpen(false)
    }
        
    const handleSubmitForm = (data) => {
        validateOTP(data.otp)
            .then((result) => {
                if(!result.success){
                    setMessage(result.message)
                    setOpen(true)
                }else{
                    localStorage.setItem("loggedIn", true)
                    navigate("/")
                }
            })
    }

    return (
        <div>
            <Popup isOpen={isOpen} closePopup={closePopup} children={message} />
            <div className='flex items-center justify-center h-screen'>
            <OTPForm onSubmitForm={handleSubmitForm} />
            </div>
        </div>
    )
}

export default OTP