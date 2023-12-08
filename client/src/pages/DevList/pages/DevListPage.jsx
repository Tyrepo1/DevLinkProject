import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DevList from '../../DevList/components/DevList'
import { getProfiles } from '../../../api/Devlist/DevListAPI'

function DevListPage({handleNameClicked}) {

  const [myProfiles, setProfiles] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profiles = await getProfiles();
        setProfiles(profiles);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };
  
    fetchData();
  
  }, []);

  const developers = [
    {
      id: 2,
      name: "Jane Smith",
      age: 28,
      skills: [{skills: "Java"}, {skills: "Python"}],
      experienceLevel: "Mid-level",
      availability: 0,
      location: "New York, USA",
      educationLevel: "Master's degree",
      preferredJob: "Freelance",
      willingnessToRelocate: "Willing",
      languages: [{languages: "English"}, {languages: "Spanish"}],
      workEnvironment: "Remote",
    },
]

  return (

    <div>
        {myProfiles && <DevList developers={myProfiles} handleNameClicked={handleNameClicked} />}
    </div>
  )
}

export default DevListPage