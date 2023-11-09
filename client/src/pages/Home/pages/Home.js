import React, { useEffect, useState } from 'react'
import TopNav from '../../../components/TopNav'
import Hero from '../components/Hero'
import SuccessStories from '../components/SuccessStories'
import HowItWorks from '../components/HowItWorks'
import Footer from '../../../components/Footer'
import DevList from '../../DevList/components/DevList'
import { useNavigate } from 'react-router-dom'

function Home() {

  return (

    <div>
      <TopNav/>
      <Hero />
      <SuccessStories/>
      <HowItWorks />
      <br></br>
      <br></br>

      <Footer />
    </div>
  )
}

export default Home