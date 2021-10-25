import { Button, TextField, Typography } from '@material-ui/core';
import React from 'react';

const CategoryForm = ({ handleSubmit, name, setName, title }) => (
  <form onSubmit={handleSubmit} style={{ margin: '0.5rem', minWidth: '120px' }}>
    <Typography variant="body1">{title}</Typography>
    <TextField
      value={name}
      size="small"
      onChange={(e) => setName(e.target.value)}
      placeholder="Tên danh mục"
      margin="dense"
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
    />

    <br />
    <Button variant="contained" color="primary" type="submit">
      Lưu
    </Button>
  </form>
);

export default CategoryForm;
