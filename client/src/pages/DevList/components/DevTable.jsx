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

function DevTable({ displayedDevelopers, filteredDevelopers, handleSort, handlePage, handleRows }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');

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

  const handleNameClicked = (developerID) => {
    navigate('/find-dev/' + developerID);
  };

  return (
    <div>
      <div>
        <TableContainer>
          <Table className={''} aria-label='simple table'>
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
      </div>
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
