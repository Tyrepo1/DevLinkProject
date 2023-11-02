import React, { useState, useContext } from 'react'
import SignupForm from '../../components/Signup/SignupForm';
import "../../styles/Signup.css"
import { useNavigate } from "react-router-dom";
import { saveUser } from '../../../../api/Signup/signupAPI';

function Signup() {

  const navigate = useNavigate()

  const [qrCodeUrl, setQrCodeUrl] = useState([])

  const handleFormSubmit = (data) => {
    if (!!data.email && !!data.name && !!data.password) {
      saveUser(data)
        .then((result) => {
          if (result === null) {
            alert("Username already exists!");
            navigate("/login");
          } else {
            localStorage.setItem("qr", result);
            localStorage.setItem("username", data.name);
            alert("User successfully signed up!");
            navigate("/qr");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <div>
      <div className='LoginForm'>
        <SignupForm onSubmitForm={handleFormSubmit} onSignup={null}/>
      </div>
      
    </div>
  )
}

export default Signup