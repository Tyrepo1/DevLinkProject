import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function DevTable({
  displayedDevelopers,
  filteredDevelopers,
  handleSort,
  handlePage,
  handleRows,
  handleNameClicked,
}) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');

  const joinArray = (array) => array.map(item => Object.values(item)[0]).join(', ')

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    handleSort(property);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    handlePage(event, newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    handleRows(event);
  };

  const renderTableSortLabel = (property, label) => (
    <TableCell>
      <TableSortLabel
        active={orderBy === property}
        direction={orderBy === property ? order : 'asc'}
        onClick={() => handleRequestSort(property)}
      >
        {label}
      </TableSortLabel>
    </TableCell>
  );

  const renderDeveloperRow = (developer, index) => (
    <TableRow key={index}>
      <TableCell>
        <span
          className='text-sky-500 cursor-pointer'
          onClick={() => handleNameClicked(developer)}
        >
          {developer.lastName + " " + developer.firstName}
        </span>
      </TableCell>
      <TableCell>{developer.age}</TableCell>
      <TableCell>{joinArray(developer.skills)}</TableCell>
      <TableCell>{developer.experienceLevel}</TableCell>
      <TableCell>
        {developer.availability ? 'Available' : 'Not Available'}
      </TableCell>
      <TableCell>{developer.location}</TableCell>
      <TableCell>{developer.educationLevel}</TableCell>
      <TableCell>{developer.jobType}</TableCell>
      <TableCell>{developer.willingnessToRelocate}</TableCell>
      <TableCell>{joinArray(developer.languages)}</TableCell>
      <TableCell>{developer.workEnvironment}</TableCell>
    </TableRow>
  );

  return (
    <div>
      <TableContainer>
        <Table className={''} aria-label='simple table'>
          <TableHead>
            <TableRow>
              {renderTableSortLabel('name', 'Name')}
              {renderTableSortLabel('age', 'Age')}
              <TableCell>Skills</TableCell>
              {renderTableSortLabel('experienceLevel', 'Experience Level')}
              <TableCell>Availability</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Education Level</TableCell>
              <TableCell>Preferred Job</TableCell>
              <TableCell>Willingness to Relocate</TableCell>
              <TableCell>Languages</TableCell>
              <TableCell>Work Environment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{displayedDevelopers.map(renderDeveloperRow)}</TableBody>
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
        className='sticky bottom-0 z-10 bg-white'
      />
    </div>
  );
}

export default DevTable;
