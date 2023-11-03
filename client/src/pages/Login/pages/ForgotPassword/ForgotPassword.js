import React from 'react'
import ForgotForm from '../../components/ForgotPassword/ForgotForm'
import "../../styles/Login.css"

function ForgotPassword() {

  const handleFormSubmit = (data) => {
    if(!!data.nameAndEmail){
      console.log("Username: " + data.nameAndEmail)
    }
    
  }
  return (
    <div>
      <div className='flex items-center justify-center h-screen'>
        <ForgotForm onSubmitForm={handleFormSubmit}/>
      </div>
      
    </div>
  )
}

export default ForgotPassword