import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  makeStyles,
  TextField, Typography
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SimpleBackdrop from 'components/Backdrop/Backdrop';
import { UserContext } from 'contexts/UserContext';
import { getCategories } from 'features/Admin/Category/pathAPI';
import { createSub, deleteSub, getSubs } from 'features/Admin/Sub/pathAPI';
import { clearState } from 'features/Admin/Sub/SubSlice';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import AdminDrawer from '../../../../../components/Drawer/AdminDrawer';
import LocalSearch from '../../components/forms/LocalSearch';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    width: 200,
  },
  item: {
    padding: '0.5rem',
    margin: '0.5rem 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    borderRadius: '0.5rem',
    backgroundColor: '#e8eaf6',
  },
  autoComplete: { margin: '0.5rem 0 0.25rem 0.5rem', width: '200px' },
  option: { backgroundColor: '#e8eaf6' },
  itemBtn: { display: 'flex' },
}));

const Sub = () => {
  // --Contexts
  const state = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [token] = state.token;
  const { enqueueSnackbar } = useSnackbar();

  // close dialog after confirm

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [inputValue, setInputValue] = React.useState('');
  const [slug, setSlug] = useState('');
  const [openDelete, setOpenDelete] = useState(false);
  // step 1
  const [keyword, setKeyword] = useState('');

  // dispatch API
  const actionGetCategories = () => dispatch(getCategories());
  const actionGetSubs = () => dispatch(getSubs());
  const actionCreateSub = (data, token) => dispatch(createSub(data, token));
  const actionDeleteSub = (slug, token) => dispatch(deleteSub(slug, token));

  //store
  const categories = useSelector((state) => state.category.categories);
  const subs = useSelector((state) => state.sub.subs);
  const isSuccess = useSelector((state) => state.sub.isSuccess);
  const isError = useSelector((state) => state.sub.isError);
  const message = useSelector((state) => state.sub.message);
  const loading = useSelector((state) => state.sub.loading);

  // snackbar
  useEffect(() => {
    return () => {
      dispatch(clearState());
    }; // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(message, { variant: 'error' });
      dispatch(clearState());
    }

    if (isSuccess) {
      enqueueSnackbar(message, { variant: 'success' });
      dispatch(clearState());
      actionGetCategories();
      actionGetSubs();
    } // eslint-disable-next-line
  }, [isError, isSuccess]);

  useEffect(() => {
    actionGetCategories();
    actionGetSubs();
  }, []);

  const handleChange = (event, newValue) => {
    setCategory(newValue);
  };

  const handleClickDeleteOpen = (slug) => {
    setOpenDelete(true);
    setSlug(slug);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, parent: category };
    actionCreateSub(data, token);
    actionGetCategories();
    setName('');
    setCategory('');
  };

  const handleRemove = () => {
    actionDeleteSub(slug, token);
    actionGetCategories();
    actionGetSubs();
    handleCloseDelete();
  };

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <>
      <Helmet>
        <title>Sub</title>
      </Helmet>
      <div className={classes.root}>
        {loading && <SimpleBackdrop />}
        <AdminDrawer i={3} />
        <main className={classes.content}>
          <Box display="flex">
            <form onSubmit={handleSubmit} style={{ margin: '0.5rem', minWidth: '120px' }}>
              <Typography variant="body1">Tạo mới thương hiệu</Typography>
              <Box display="flex">
                <TextField
                  value={name}
                  size="small"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tên thương hiệu"
                  margin="dense"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
                <div className={classes.autoComplete}>
                  <Autocomplete
                    value={category}
                    onChange={handleChange}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    classes={{
                      option: classes.option,
                    }}
                    id="controllable-states-demo"
                    options={categories}
                    getOptionLabel={(option) => option.name || ''}
                    getOptionSelected={(option, value) => option.value === value.value}
                    renderInput={(params) => (
                      <TextField {...params} label="Danh mục" variant="outlined" size="small" />
                    )}
                  />
                </div>
              </Box>
              <Button variant="contained" color="primary" type="submit">
                Lưu
              </Button>
            </form>
            <LocalSearch keyword={keyword} setKeyword={setKeyword} placeholder="Tên thương hiệu" />
          </Box>

          {/* step 5 */}
          <Box m="0.5rem">
            <Typography variant="body1">Danh sách thương hiệu&nbsp;({subs.length})</Typography>
            {subs.length > 0 &&
              subs.filter(searched(keyword)).map((c, index) => (
                <div className={classes.wrapper} key={c.slug}>
                  <div className={classes.item}>
                    <p>{c.name}</p>
                    <div className={classes.itemBtn}>
                      <IconButton onClick={() => history.push(`/admin/sub/${c.slug}`)} size="small">
                        <EditIcon color="primary" />
                      </IconButton>
                      <IconButton onClick={() => handleClickDeleteOpen(c.slug)} size="small">
                        <DeleteOutlineIcon color="secondary" />
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))}
            {/* Box delete */}
            <Box>
              <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">Xóa danh mục</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Bạn có chắc chắn xóa?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDelete} color="primary">
                    Đóng
                  </Button>
                  <Button onClick={handleRemove} color="primary" autoFocus>
                    Xác nhận
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </main>
      </div>
    </>
  );
};

export default Sub;
