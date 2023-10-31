import React from 'react'
import LoginForm from '../../components/Login/LoginForm'
import "../../styles/Login.css"
import { getListUsers } from '../../../../api/Login/loginAPI'

function Login() {

  const handleFormSubmit = (data) => {
    if(!!data.name && !!data.password){
      console.log("Username: " + data.name)
      console.log("Password: " + data.password)
      getListUsers();
    }
    
  }
  return (
    <div>
      <div className='LoginForm'>
        <LoginForm onSubmitForm={handleFormSubmit}/>
      </div>
      
    </div>
  )
}

export default Login