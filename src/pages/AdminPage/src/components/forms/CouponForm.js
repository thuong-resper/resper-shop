import { Box, Button, InputAdornment, TextField, Typography } from '@material-ui/core';
import React from 'react';

const CouponForm = ({
  handleSubmit,
  name,
  setName,
  discount,
  setDiscount,
  expiry,
  setExpiry,
  title,
}) => (
  <form onSubmit={handleSubmit} style={{ margin: '0.5rem', minWidth: '120px' }}>
    <Typography variant="body1">{title}</Typography>
    <Box display="flex">
      <TextField
        value={name}
        size="small"
        inputProps={{ minLength: 6, maxLength: 12 }}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tên voucher"
        margin="dense"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        style={{ minWidth: '10rem', marginRight: '0.5rem' }}
      />
      <TextField
        size="small"
        onChange={(e) => setDiscount(e.target.value)}
        placeholder="Giảm giá"
        margin="dense"
        InputLabelProps={{
          shrink: true,
        }}
        type="number"
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start">%</InputAdornment>,
          inputProps: {
            max: 50,
            min: 0,
          },
        }}
        style={{ minWidth: '10rem', marginRight: '0.5rem' }}
      />
      <TextField
        value={expiry}
        id="datetime-local"
        type="datetime-local"
        size="small"
        onChange={(e) => setExpiry(e.target.value)}
        margin="dense"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        style={{ minWidth: '10rem', marginRight: '0.5rem' }}
      />
    </Box>

    <br />
    <Button variant="contained" color="primary" type="submit">
      Lưu
    </Button>
  </form>
);

export default CouponForm;
