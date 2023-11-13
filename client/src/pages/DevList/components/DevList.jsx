import React, { useState } from 'react';
import DevTable from './DevTable';
import Filter from './Filter';

function DevList({ developers }) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');

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

  const [filteredDevelopers, setFilteredDevelopers] = useState(developers);

  const handleFilterChange = (filteredDevelopers) => {
    setFilteredDevelopers(filteredDevelopers);
  };

  const sortedDevelopers = [...filteredDevelopers].sort((a, b) => {
    const isAsc = order === 'asc';
    return isAsc ? (a[orderBy] > b[orderBy] ? 1 : -1) : a[orderBy] < b[orderBy] ? 1 : -1;
  });

  const displayedDevelopers = sortedDevelopers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className='md:mx-20 shadow-2xl pt-10 px-10'>
      <div className='sticky top-16 z-10 bg-white'>
        <Filter developers={developers} onFilterChange={handleFilterChange} />
      </div>
      <div style={{ marginTop: '5rem' }}>
        <DevTable
          filteredDevelopers={filteredDevelopers}
          displayedDevelopers={displayedDevelopers}
          handleSort={handleRequestSort}
          handlePage={handlePageChange}
          handleRows={handleRowsPerPageChange}
        />
      </div>
    </div>
  );
  
}

export default DevList;
