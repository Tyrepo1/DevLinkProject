import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { validateOTP } from '../../../../api/Login/loginAPI';
import Popup from '../../../../components/Popup';
import OTPForm from '../../components/OTP/OTPForm';

function OTP() {

    const navigate = useNavigate()
    const location = useLocation();
    const alertMessage = location.state?.alertMessage || null;
    console.log(alertMessage)

    const [isOpen, setOpen] = useState(false)
    const [message, setMessage] = useState("Empty message")
    const [alerted, setAlerted] = useState(true)
    const [loading, setLoading] = useState(false)

    const closePopup = () => {
        setOpen(false)
        setAlerted(false)
    }
        
    const handleSubmitForm = (data) => {
        setLoading(true)
        validateOTP(data.otp)
            .then((result) => {
                if(!result.success){
                    setMessage(result.message)
                    setOpen(true)
                    setLoading(false)
                }else{
                    localStorage.removeItem("otp")
                    localStorage.setItem("loggedIn", true)
                    navigate("/home")
                }
            })
    }

    return (
        <div>
            {alertMessage && (
            <Popup isOpen={alerted} closePopup={closePopup} children={alertMessage} severity="success" />
            )}
            <Popup isOpen={isOpen} closePopup={closePopup} children={message} severity="error"/>
            <div className='flex items-center justify-center h-screen'>
            <OTPForm onSubmitForm={handleSubmitForm} loading={loading}/>
            </div>
        </div>
    )
}

export default OTP