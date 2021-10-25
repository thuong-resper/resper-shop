import { IconButton, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { updateSearch } from 'features/Search/SearchProductSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const defaultValues = {
  name: '',
};

export const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
}));

const Search = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(defaultValues);

  // dispatch
  const actionSaveSearch = (keyword) => dispatch(updateSearch(keyword));
  const [isFormValid, setIsFormValid] = useState(true);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (e.target.value.trim() === '') {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const search = formValues.name.trim().replace(/ /g, '-');
    const keyword = formValues.name;
    actionSaveSearch(keyword);
    const url = `/shop?query=${search}`;
    history.push(url);
  };
  return (
    <form onSubmit={handleSubmit} className={classes.search}>
      <TextField
        variant="outlined"
        size="small"
        id="name-input"
        name="name"
        placeholder="Tìm kiếm..."
        type="text"
        value={formValues.name}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                aria-label="submit answer"
                data-testid="submit"
                size="small"
                disabled={isFormValid}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};
export default Search;
