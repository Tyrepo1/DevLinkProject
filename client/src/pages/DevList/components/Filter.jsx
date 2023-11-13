import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

const ageRanges = {
  '18-24': { min: 18, max: 24, label: '18-24' },
  '25-29': { min: 25, max: 29, label: '25-29' },
  '30-34': { min: 30, max: 34, label: '30-34' },
  '35-39': { min: 35, max: 39, label: '35-39' },
  '40-46': { min: 40, max: 46, label: '40-46' },
  '46 and above': { min: 46, max: Infinity, label: '46 and above' },
};

const educationLevels = ["Bachelor's degree", "Master's degree", 'Ph.D.'];

const preferredJobs = ['Full-time', 'Part-time', 'Freelance'];

const willingnessToRelocateOptions = ['Willing', 'Not willing'];

const workEnvironments = ['On-site', 'Remote'];

function Filter({ developers, onFilterChange }) {
  const [skillsFilter, setSkillsFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [educationLevelFilter, setEducationLevelFilter] = useState('');
  const [preferredJobFilter, setPreferredJobFilter] = useState('');
  const [willingnessToRelocateFilter, setWillingnessToRelocateFilter] = useState('');
  const [languagesFilter, setLanguagesFilter] = useState('');
  const [workEnvironmentFilter, setWorkEnvironmentFilter] = useState('');

  const filteredDevelopers = developers.filter((developer) => {
    const skillsMatch = developer.skills
      .join(', ')
      .toLowerCase()
      .includes(skillsFilter.toLowerCase());
    const experienceMatch = developer.experienceLevel
      .toLowerCase()
      .includes(experienceFilter.toLowerCase());
    const availabilityMatch =
      availabilityFilter === '' ||
      (developer.availability ? 'available' : 'not available') ===
        availabilityFilter;

    const ageMatch =
      ageFilter === '' ||
      (developer.age >= ageRanges[ageFilter].min &&
        developer.age <= ageRanges[ageFilter].max);

    const locationMatch =
      locationFilter === '' || developer.location.toLowerCase().includes(locationFilter.toLowerCase());

    const educationLevelMatch =
      educationLevelFilter === '' ||
      developer.educationLevel.toLowerCase().includes(educationLevelFilter.toLowerCase());

    const preferredJobMatch =
      preferredJobFilter === '' || developer.preferredJob.toLowerCase() === preferredJobFilter.toLowerCase();

    const willingnessToRelocateMatch =
      willingnessToRelocateFilter === '' ||
      developer.willingnessToRelocate.toLowerCase() === willingnessToRelocateFilter.toLowerCase();

    const languagesMatch =
      languagesFilter === '' ||
      developer.languages.some((lang) => lang.toLowerCase().includes(languagesFilter.toLowerCase()));

    const workEnvironmentMatch =
      workEnvironmentFilter === '' ||
      developer.workEnvironment.toLowerCase() === workEnvironmentFilter.toLowerCase();

    return (
      skillsMatch &&
      experienceMatch &&
      availabilityMatch &&
      ageMatch &&
      locationMatch &&
      educationLevelMatch &&
      preferredJobMatch &&
      willingnessToRelocateMatch &&
      languagesMatch &&
      workEnvironmentMatch
    );
  });

  const handleResetFilters = () => {
    setSkillsFilter('');
    setExperienceFilter('');
    setAvailabilityFilter('');
    setAgeFilter('');
    setLocationFilter('');
    setEducationLevelFilter('');
    setPreferredJobFilter('');
    setWillingnessToRelocateFilter('');
    setLanguagesFilter('');
    setWorkEnvironmentFilter('');
    onFilterChange(filteredDevelopers);
  };

  const handleSkillsFilterChange = (event) => {
    setSkillsFilter(event.target.value);
    onFilterChange(filteredDevelopers);
  };

  const handleExperienceFilterChange = (event) => {
    setExperienceFilter(event.target.value);
    onFilterChange(filteredDevelopers);
  };

  const handleAvailabilityFilterChange = (event) => {
    setAvailabilityFilter(event.target.value);
    onFilterChange(filteredDevelopers);
  };

  const handleAgeFilterChange = (event) => {
    const selectedAgeRange = event.target.value;
    setAgeFilter(selectedAgeRange);
    onFilterChange(filteredDevelopers);
  };

  const handleLocationFilterChange = (event) => {
    const selectedLocation = event.target.value;
    setLocationFilter(selectedLocation);
    onFilterChange(filteredDevelopers);
  };

  const handleEducationLevelFilterChange = (event) => {
    const selectedEducationLevel = event.target.value;
    setEducationLevelFilter(selectedEducationLevel);
    onFilterChange(filteredDevelopers);
  };

  const handlePreferredJobFilterChange = (event) => {
    const selectedPreferredJob = event.target.value;
    setPreferredJobFilter(selectedPreferredJob);
    onFilterChange(filteredDevelopers);
  };

  const handleWillingnessToRelocateFilterChange = (event) => {
    const selectedWillingnessToRelocate = event.target.value;
    setWillingnessToRelocateFilter(selectedWillingnessToRelocate);
    onFilterChange(filteredDevelopers);
  };

  const handleLanguagesFilterChange = (event) => {
    setLanguagesFilter(event.target.value);
    onFilterChange(filteredDevelopers);
  };

  const handleWorkEnvironmentFilterChange = (event) => {
    const selectedWorkEnvironment = event.target.value;
    setWorkEnvironmentFilter(selectedWorkEnvironment);
    onFilterChange(filteredDevelopers);
  };

  useEffect(() => {
    onFilterChange(filteredDevelopers);
  });

  return (
    <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-10'}>
      <TextField
        label='Skills'
        variant='outlined'
        value={skillsFilter}
        onChange={handleSkillsFilterChange}
        className={''}
      />
      <FormControl variant='outlined' className={''}>
        <InputLabel id='experience-filter-label'>Experience</InputLabel>
        <Select
          labelId='experience-filter-label'
          value={experienceFilter}
          onChange={handleExperienceFilterChange}
          label='Experience'
        >
          <MenuItem value=''>
            <em>Any</em>
          </MenuItem>
          <MenuItem value='Junior'>Junior</MenuItem>
          <MenuItem value='Mid-level'>Mid-level</MenuItem>
          <MenuItem value='Senior'>Senior</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant='outlined' className={''}>
        <InputLabel id='availability-filter-label'>Availability</InputLabel>
        <Select
          labelId='availability-filter-label'
          value={availabilityFilter}
          onChange={handleAvailabilityFilterChange}
          label='Availability'
        >
          <MenuItem value=''>
            <em>Any</em>
          </MenuItem>
          <MenuItem value='available'>Available</MenuItem>
          <MenuItem value='not available'>Not Available</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant='outlined' className={''}>
        <InputLabel id='age-filter-label'>Age Range</InputLabel>
        <Select
          labelId='age-filter-label'
          value={ageFilter}
          onChange={handleAgeFilterChange}
          label='Age Range'
        >
          <MenuItem value=''>Any</MenuItem>
          {Object.keys(ageRanges).map((range) => (
            <MenuItem key={range} value={range}>
              {ageRanges[range].label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label='Location'
        variant='outlined'
        value={locationFilter}
        onChange={handleLocationFilterChange}
        className={''}
      />
      <FormControl variant='outlined' className={''}>
        <InputLabel id='education-level-filter-label'>Education Level</InputLabel>
        <Select
          labelId='education-level-filter-label'
          value={educationLevelFilter}
          onChange={handleEducationLevelFilterChange}
          label='Education Level'
        >
          <MenuItem value=''>Any</MenuItem>
          {educationLevels.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant='outlined' className={''}>
        <InputLabel id='preferred-job-filter-label'>Preferred Job</InputLabel>
        <Select
          labelId='preferred-job-filter-label'
          value={preferredJobFilter}
          onChange={handlePreferredJobFilterChange}
          label='Preferred Job'
        >
          <MenuItem value=''>Any</MenuItem>
          {preferredJobs.map((job) => (
            <MenuItem key={job} value={job}>
              {job}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant='outlined' className={''}>
        <InputLabel id='relocate-filter-label'>Willingness to Relocate</InputLabel>
        <Select
          labelId='relocate-filter-label'
          value={willingnessToRelocateFilter}
          onChange={handleWillingnessToRelocateFilterChange}
          label='Willingness to Relocate'
        >
          <MenuItem value=''>Any</MenuItem>
          {willingnessToRelocateOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label='Languages'
        variant='outlined'
        value={languagesFilter}
        onChange={handleLanguagesFilterChange}
        className={''}
      />
      <FormControl variant='outlined' className={''}>
        <InputLabel id='work-environment-filter-label'>Work Environment</InputLabel>
        <Select
          labelId='work-environment-filter-label'
          value={workEnvironmentFilter}
          onChange={handleWorkEnvironmentFilterChange}
          label='Work Environment'
        >
          <MenuItem value=''>Any</MenuItem>
          {workEnvironments.map((env) => (
            <MenuItem key={env} value={env}>
              {env}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <button onClick={handleResetFilters} className="bg-gray-300 px-4 py-2 rounded-md">
        Reset Filters
      </button>
    </div>
  );
}

export default Filter;
