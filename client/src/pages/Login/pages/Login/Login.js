import React from 'react';
import { useNavigate } from "react-router-dom";
import LoginForm from '../../components/Login/LoginForm';
import "../../styles/Login.css";
import { loginUser } from '../../../../api/Login/loginAPI';

function Login() {

  const navigate = useNavigate()

  const handleFormSubmit = async (data) => {
    loginUser(data)
      .then((result) => {
        if(result.success){
          navigate("/")
        }else{
          alert(result.message)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const handleSignup = () => {
    navigate("/signup")
  }

  return (
    <div>
      <div className='LoginForm'>
        <LoginForm onSubmitForm={handleFormSubmit} onSignup={handleSignup}/>
      </div>
      
    </div>
  )
}

export default Login