import { getProfile, saveProfile } from '../../../api/CreateProfile/CreateProfileAPI'
import ProfileForm from '../components/ProfileForm'

import React, { useEffect, useState } from 'react'



function CreateProfile() {

  const [profile, setProfile] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const profile = await getProfile(localStorage.getItem("username"));
        setIsLoading(false)
        setProfile(profile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
  
    fetchData();
  
  }, []);

  const handleFormSubmit = (value) => {
    saveProfile(value)
  }

  return (
    <div>
        {!isLoading? (<ProfileForm onSubmitForm={handleFormSubmit} profile={profile}/>) : ("Loading...")}
    </div>
  )
}

export default CreateProfile