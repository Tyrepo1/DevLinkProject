import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import AgentsList from '../components/AgentsList';
import Chart from '../components/LineChart';
import Pie from '../components/PieChart';
import StatViewer from '../components/StatViewer';
import {getProfiles} from '../../../api/Analytics/AnalyticsAPI'

const statData = [
  { icon: <VisibilityIcon fontSize="large" />, name: "Total Views", unit: "views", value: "10000" },
  { icon: <ArrowDownwardIcon fontSize="large" />, name: "CV downloaded", unit: "times", value: "100" },
];

const stats = [
  { day: "28-02-2024", downloads: 150, views: 1000 },
  { day: "01-03-2024", downloads: 150, views: 1000 },
  { day: "02-03-2024", downloads: 200, views: 800 },
  { day: "03-03-2024", downloads: 180, views: 1200 },
  { day: "04-03-2024", downloads: 250, views: 900 },
  { day: "05-03-2024", downloads: 300, views: 1100 },
]

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
  { value: "jobType", label: "Preferred Job" },
  { value: "workEnvironment", label: "Work Environment" },
  { value: "willingnessToRelocate", label: "Willingness to Relocate" }
];

function Analytics({handleAgentSelect}) {
  const [field, setField] = useState("skills");
  const [agentData, setAgentData] = useState([])
  const [developers, setDevelopers] = useState([])
  const [pieProps, setPieProps] = useState({
    name: "Popularity of fields",
    data: developers,
    keyName: "skills"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const devs = await getProfiles();
        setDevelopers([
          {
            "skills": [{"skills": "Java"}, {"skills": "Python"}],
            "languages": [{"languages": "English"}, {"languages": "Russian"}],
            "experienceLevel": "Junior",
            "educationLevel": "Bachelor's Degree",
            "jobType": "Full-time",
            "workEnvironment": "On-Site",
            "willingnessToRelocate": "Willing"
          },
          {
            "skills": [{"skills": "JavaScript"}, {"skills": "React"}],
            "languages": [{"languages": "Spanish"}, {"languages": "French"}],
            "experienceLevel": "Intermediate",
            "educationLevel": "Master's Degree",
            "jobType": "Part-time",
            "workEnvironment": "Remote",
            "willingnessToRelocate": "Not willing"
          },
          {
            "skills": [{"skills": "C#"}, {"skills": "ASP.NET"}],
            "languages": [{"languages": "German"}, {"languages": "Chinese"}],
            "experienceLevel": "Senior",
            "educationLevel": "Ph.D.",
            "jobType": "Contract",
            "workEnvironment": "Hybrid",
            "willingnessToRelocate": "Depends on the offer"
          },
          {
            "skills": [{"skills": "Java"}, {"skills": "Python"}],
            "languages": [{"languages": "English"}, {"languages": "Russian"}],
            "experienceLevel": "Junior",
            "educationLevel": "Bachelor's Degree",
            "jobType": "Full-time",
            "workEnvironment": "On-Site",
            "willingnessToRelocate": "Willing"
          },
          {
            "skills": [{"skills": "JavaScript"}, {"skills": "React"}],
            "languages": [{"languages": "Spanish"}, {"languages": "French"}],
            "experienceLevel": "Intermediate",
            "educationLevel": "Master's Degree",
            "jobType": "Part-time",
            "workEnvironment": "Remote",
            "willingnessToRelocate": "Not willing"
          },
          {
            "skills": [{"skills": "C#"}, {"skills": "ASP.NET"}],
            "languages": [{"languages": "German"}, {"languages": "Chinese"}],
            "experienceLevel": "Senior",
            "educationLevel": "Ph.D.",
            "jobType": "Contract",
            "workEnvironment": "Hybrid",
            "willingnessToRelocate": "Depends on the offer"
          },
          {
            "skills": [{"skills": "Java"}, {"skills": "Python"}],
            "languages": [{"languages": "English"}, {"languages": "Russian"}],
            "experienceLevel": "Junior",
            "educationLevel": "Bachelor's Degree",
            "jobType": "Full-time",
            "workEnvironment": "On-Site",
            "willingnessToRelocate": "Willing"
          },
          {
            "skills": [{"skills": "JavaScript"}, {"skills": "React"}],
            "languages": [{"languages": "Spanish"}, {"languages": "French"}],
            "experienceLevel": "Intermediate",
            "educationLevel": "Master's Degree",
            "jobType": "Part-time",
            "workEnvironment": "Remote",
            "willingnessToRelocate": "Not willing"
          },
          {
            "skills": [{"skills": "C#"}, {"skills": "ASP.NET"}],
            "languages": [{"languages": "German"}, {"languages": "Chinese"}],
            "experienceLevel": "Senior",
            "educationLevel": "Ph.D.",
            "jobType": "Contract",
            "workEnvironment": "Hybrid",
            "willingnessToRelocate": "Depends on the offer"
          },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

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
          <AgentsList agentData={agentData} handleAgentSelect={handleAgentSelect}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default Analytics;
