import ProfileForm from '../components/ProfileForm'

import React from 'react'

const handleFormSubmit = (value) => {
    alert(JSON.stringify(value))
}

function CreateProfile() {
  return (
    <div>
        <ProfileForm onSubmitForm={handleFormSubmit}/>
    </div>
  )
}

export default CreateProfile