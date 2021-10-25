import TextField from '@material-ui/core/TextField';
import React, { forwardRef } from 'react';

export const Input = forwardRef((props, ref) => {
  return (
    <TextField
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
      margin="normal"
      size="small"
      inputRef={ref}
      fullWidth
      {...props}
    />
  );
});
