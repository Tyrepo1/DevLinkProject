import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import Chart from '../components/LineChart';
import Pie from '../components/PieChart';
import StatViewer from '../components/StatViewer';
import AgentsList from '../components/AgentsList';

const statData = [
  { icon: <VisibilityIcon fontSize="large" />, name: "Total Views", unit: "views", value: "10000" },
  { icon: <ArrowDownwardIcon fontSize="large" />, name: "CV downloaded", unit: "times", value: "100" },
];

const stats = [
  { day: 1, downloads: 150, views: 1000 },
  { day: 2, downloads: 200, views: 800 },
  { day: 3, downloads: 180, views: 1200 },
  { day: 4, downloads: 250, views: 900 },
  { day: 5, downloads: 300, views: 1100 },
  // Add more data points as needed
];

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
const agentData = [
  {
    name: "John Smith",
    company: "ABC",
    message: "Hello, we would like to have you in for an interview!"
  },
  {
    name: "Jane Doe",
    company: "XYZ",
    message: "We are impressed with your skills. Let's schedule an interview!"
  },
  {
    name: "Alex Johnson",
    company: "123 Corp",
    message: "Greetings! Your application caught our attention. We'd like to discuss further."
  },
  {
    name: "Emily Brown",
    company: "Tech Innovators",
    message: "Congratulations! You've been shortlisted. We'd love to meet you in person."
  },
  {
    name: "Michael Davis",
    company: "Global Solutions",
    message: "Hello, we believe your experience aligns with our requirements. Let's arrange an interview."
  },
  {
    name: "Sophia White",
    company: "Infinite Technologies",
    message: "We appreciate your interest. Can we schedule a call to discuss your application?"
  },
];

const keyToLabel = {
  views: 'Total Views',
  downloads: 'Total Downloads',
};

const colors = {
  views: 'blue',
  downloads: 'lightblue',
};

const customize = {
  height: 300,
  legend: { hidden: true },
  margin: { top: 5 },
  stackingOrder: 'descending',
};

const chartProps = {
  data: stats,
  labels: keyToLabel,
  colors: colors,
  customization: customize,
  name: "This Month",
  key: "day",
  min: 1,
  max: 31,
};

const fieldOptions = [
  { value: "skills", label: "Skills" },
  { value: "languages", label: "Languages" },
  { value: "experienceLevel", label: "Experience Level" },
  { value: "educationLevel", label: "Education Level" },
  { value: "preferredJob", label: "Preferred Job" },
  { value: "workEnvironment", label: "Work Environment" },
  { value: "willingnessToRelocate", label: "Willingness to Relocate" }
];

const handleAgemtSelect = (agent) => {
  alert(agent)
}

function Analytics() {
  const [field, setField] = useState("skills");
  const [pieProps, setPieProps] = useState({
    name: "Popularity of fields",
    data: developers,
    keyName: "skills"
  });

  
  useEffect(() => {
    setPieProps({
      name: "Popularity of fields",
      data: developers,
      keyName: field
    });
  }, [field])

  const handleChange = (event) => {
    setField(event.target.value);
  };
  
  return (
    <div className=''>
      <Grid container className='w-screen' spacing={2}>
        {statData.map((stat, index) => (
          <Grid key={index} item xs={12} md={6}>
            <StatViewer icon={stat.icon} name={stat.name} unit={stat.unit} value={stat.value} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Chart {...chartProps} />
        </Grid>
        <Grid item xs={12} >
          <FormControl fullWidth>
              <InputLabel id="field-select-label">Field</InputLabel>
              <Select
                labelId="field-select-label"
                id="field-select"
                value={field}
                label="Field"
                onChange={handleChange}
              >
                {fieldOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          <Pie {...pieProps}/>
        </Grid>
        <Grid item xs={12}>
          <AgentsList agentData={agentData} handleAgentSelect={handleAgemtSelect}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default Analytics;
