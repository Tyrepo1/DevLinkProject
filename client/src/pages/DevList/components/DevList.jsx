import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


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

function DevList({ developers }) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');

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

  const navigate = useNavigate();

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSkillsFilterChange = (event) => {
    setSkillsFilter(event.target.value);
  };

  const handleExperienceFilterChange = (event) => {
    setExperienceFilter(event.target.value);
  };

  const handleAvailabilityFilterChange = (event) => {
    setAvailabilityFilter(event.target.value);
  };

  const handleAgeFilterChange = (event) => {
    const selectedAgeRange = event.target.value;
    setAgeFilter(selectedAgeRange);
  };

  const handleLocationFilterChange = (event) => {
    const selectedLocation = event.target.value;
    setLocationFilter(selectedLocation);
  };

  const handleEducationLevelFilterChange = (event) => {
    const selectedEducationLevel = event.target.value;
    setEducationLevelFilter(selectedEducationLevel);
  };

  const handlePreferredJobFilterChange = (event) => {
    const selectedPreferredJob = event.target.value;
    setPreferredJobFilter(selectedPreferredJob);
  };

  const handleWillingnessToRelocateFilterChange = (event) => {
    const selectedWillingnessToRelocate = event.target.value;
    setWillingnessToRelocateFilter(selectedWillingnessToRelocate);
  };

  const handleLanguagesFilterChange = (event) => {
    setLanguagesFilter(event.target.value);
  };

  const handleWorkEnvironmentFilterChange = (event) => {
    const selectedWorkEnvironment = event.target.value;
    setWorkEnvironmentFilter(selectedWorkEnvironment);
  };

  const handleNameClicked = (developerID) => {
    navigate('/find-dev/' + developerID);
  };

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

  const sortedDevelopers = [...filteredDevelopers].sort((a, b) => {
    const isAsc = order === 'asc';
    return isAsc ? (a[orderBy] > b[orderBy] ? 1 : -1) : a[orderBy] < b[orderBy] ? 1 : -1;
  });

  const displayedDevelopers = sortedDevelopers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className='md:mx-20 shadow-2xl pt-10 px-10 '>
      <div className={"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-10"}>
        <TextField
          label='Skills'
          variant='outlined'
          value={skillsFilter}
          onChange={handleSkillsFilterChange}
          className={""}
        />
        <FormControl variant='outlined' className={""}>
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
        <FormControl variant='outlined' className={""}>
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
        <FormControl variant='outlined' className={""}>
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
          className={""}
        />
        <FormControl variant='outlined' className={""}>
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
        <FormControl variant='outlined' className={""}>
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
        <FormControl variant='outlined' className={""}>
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
          className={""}
        />
        <FormControl variant='outlined' className={""}>
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
      </div>
      <TableContainer>
        <Table className={""} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'age'}
                  direction={orderBy === 'age' ? order : 'asc'}
                  onClick={() => handleRequestSort('age')}
                >
                  Age
                </TableSortLabel>
              </TableCell>
              <TableCell>Skills</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'experienceLevel'}
                  direction={orderBy === 'experienceLevel' ? order : 'asc'}
                  onClick={() => handleRequestSort('experienceLevel')}
                >
                  Experience Level
                </TableSortLabel>
              </TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Education Level</TableCell>
              <TableCell>Preferred Job</TableCell>
              <TableCell>Willingness to Relocate</TableCell>
              <TableCell>Languages</TableCell>
              <TableCell>Work Environment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedDevelopers.map((developer, index) => (
              <TableRow key={index}>
                <TableCell>
                  <span
                    className='text-sky-500 cursor-pointer'
                    onClick={() => handleNameClicked(developer.id)}
                  >
                    {developer.name}
                  </span>
                </TableCell>
                <TableCell>{developer.age}</TableCell>
                <TableCell>{developer.skills.join(', ')}</TableCell>
                <TableCell>{developer.experienceLevel}</TableCell>
                <TableCell>
                  {developer.availability ? 'Available' : 'Not Available'}
                </TableCell>
                <TableCell>{developer.location}</TableCell>
                <TableCell>{developer.educationLevel}</TableCell>
                <TableCell>{developer.preferredJob}</TableCell>
                <TableCell>{developer.willingnessToRelocate}</TableCell>
                <TableCell>{developer.languages.join(', ')}</TableCell>
                <TableCell>{developer.workEnvironment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={filteredDevelopers.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
}

export default DevList;
