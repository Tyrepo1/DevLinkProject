import { saveProfile } from '../../../api/CreateProfile/CreateProfileAPI'
import ProfileForm from '../components/ProfileForm'

import React from 'react'



function CreateProfile({profile, handleSubmit}) {

  const handleFormSubmit = (value) => {
    saveProfile(value)
    handleSubmit()
  }

  return (
    <div>
        <ProfileForm onSubmitForm={handleFormSubmit} profile={profile}/>
    </div>
  )
}

export default CreateProfile