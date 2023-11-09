import React, { useEffect, useState } from 'react'
import TopNav from '../../../components/TopNav'
import Footer from '../../../components/Footer'
import DevList from '../../DevList/components/DevList'
import { useNavigate } from 'react-router-dom'

function DevListPage() {

  const navigate = useNavigate()

  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"))
    setUsername(localStorage.getItem("username"))

  });

  const developers = [
    {
      id: 1,
      name: "John Doe",
      age: 30,
      skills: ["JavaScript", "React", "Node.js", "HTML", "CSS"],
      experienceLevel: "Senior",
      availability: 1,
      location: "San Francisco, USA",
      educationLevel: "Bachelor's degree",
      preferredJob: "Full-time",
      willingnessToRelocate: "Not willing",
      languages: ["English"],
      workEnvironment: "On-site",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 28,
      skills: ["Java", "Spring Boot", "Angular", "SQL"],
      experienceLevel: "Mid-level",
      availability: 0,
      location: "New York, USA",
      educationLevel: "Master's degree",
      preferredJob: "Freelance",
      willingnessToRelocate: "Willing",
      languages: ["English", "Spanish"],
      workEnvironment: "Remote",
    },
    {
      id: 3,
      name: "Alex Johnson",
      age: 25,
      skills: ["Python", "Django", "Flask", "JavaScript"],
      experienceLevel: "Junior",
      availability: 1,
      location: "London, UK",
      educationLevel: "Bachelor's degree",
      preferredJob: "Full-time",
      willingnessToRelocate: "Willing",
      languages: ["English"],
      workEnvironment: "On-site",
    },
    {
      id: 4,
      name: "Emily Davis",
      age: 32,
      skills: ["Ruby", "Rails", "JavaScript", "Vue.js"],
      experienceLevel: "Senior",
      availability: 1,
      location: "Berlin, Germany",
      educationLevel: "Ph.D.",
      preferredJob: "Part-time",
      willingnessToRelocate: "Not willing",
      languages: ["English", "German"],
      workEnvironment: "On-site",
    },
    {
      id: 5,
      name: "Chris Lee",
      age: 29,
      skills: ["C#", ".NET", "Angular", "TypeScript"],
      experienceLevel: "Mid-level",
      availability: 0,
      location: "Toronto, Canada",
      educationLevel: "Bachelor's degree",
      preferredJob: "Full-time",
      willingnessToRelocate: "Willing",
      languages: ["English", "French"],
      workEnvironment: "Remote",
    },
    {
      id: 6,
      name: "Mia Brown",
      age: 26,
      skills: ["PHP", "Laravel", "JavaScript", "React"],
      experienceLevel: "Junior",
      availability: 1,
      location: "Sydney, Australia",
      educationLevel: "Master's degree",
      preferredJob: "Freelance",
      willingnessToRelocate: "Willing",
      languages: ["English"],
      workEnvironment: "On-site",
    },
    {
      id: 7,
      name: "Daniel Kim",
      age: 31,
      skills: ["Go", "Gin", "JavaScript", "React"],
      experienceLevel: "Senior",
      availability: 0,
      location: "Seoul, South Korea",
      educationLevel: "Bachelor's degree",
      preferredJob: "Full-time",
      willingnessToRelocate: "Not willing",
      languages: ["Korean", "English"],
      workEnvironment: "Remote",
    },
    {
      id: 8,
      name: "Sophie Chen",
      age: 27,
      skills: ["Swift", "iOS", "JavaScript", "React Native"],
      experienceLevel: "Mid-level",
      availability: 1,
      location: "Tokyo, Japan",
      educationLevel: "Master's degree",
      preferredJob: "Part-time",
      willingnessToRelocate: "Willing",
      languages: ["Japanese", "English"],
      workEnvironment: "On-site",
    },
    {
      id: 9,
      name: "Michael Nguyen",
      age: 34,
      skills: ["Java", "Spring Boot", "Angular", "SQL"],
      experienceLevel: "Senior",
      availability: 1,
      location: "Ho Chi Minh City, Vietnam",
      educationLevel: "Bachelor's degree",
      preferredJob: "Full-time",
      willingnessToRelocate: "Not willing",
      languages: ["Vietnamese", "English"],
      workEnvironment: "Remote",
    },
    {
      id: 10,
      name: "Anna Rodriguez",
      age: 29,
      skills: ["Python", "Django", "Flask", "JavaScript"],
      experienceLevel: "Junior",
      availability: 0,
      location: "Mexico City, Mexico",
      educationLevel: "Bachelor's degree",
      preferredJob: "Freelance",
      willingnessToRelocate: "Willing",
      languages: ["Spanish", "English"],
      workEnvironment: "On-site",
    }, 
]

  const handleGetStarted = () => {
    navigate('/login')
  }
  return (

    <div>
        <DevList developers={developers} />
    </div>
  )
}

export default DevListPage