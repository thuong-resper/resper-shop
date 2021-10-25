import { TextField, Typography } from '@material-ui/core';
import React from 'react';

const LocalSearch = ({ keyword, setKeyword, placeholder }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <div style={{ margin: '0.5rem', minWidth: '120px' }}>
      <Typography variant="body1">Tìm kiếm</Typography>
      <TextField
        value={keyword}
        type="search"
        size="small"
        onChange={handleSearchChange}
        id="outlined-full-width"
        placeholder={placeholder}
        margin="dense"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
    </div>
  );
};

export default LocalSearch;
