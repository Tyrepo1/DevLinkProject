import React, { useEffect, useState } from 'react'
import DevList from '../../DevList/components/DevList'
import { getProfiles } from '../../../api/Devlist/DevListAPI'
import { useDispatch } from 'react-redux'
import { changeScreen } from '../../../core/state/screenChanger/screenSlice'

function DevListPage() {

  const [myProfiles, setProfiles] = useState(null)
  const dispatch = useDispatch();

  const handleNameClicked = (developer) => {
    dispatch(changeScreen({name: "profile", profile: developer}))
  }

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

  return (

    <div>
      {myProfiles && <DevList developers={myProfiles} handleNameClicked={handleNameClicked} />}
    </div>
  )
}

export default DevListPage