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
  TextField,
  Typography,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import SimpleBackdrop from 'components/Backdrop/Backdrop';
import AdminSidebar from 'components/Navigation/MainMenu/AdminSidebar';
import { UserContext } from 'contexts/UserContext';
import { clearState } from 'features/Admin/Category/CategorySlice';
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from 'features/Admin/Category/pathAPI';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import CategoryForm from '../../components/forms/CategoryForm';
import LocalSearch from '../../components/forms/LocalSearch';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
  dialog: { minWidth: '400px' },
  itemBtn: { display: 'flex' },
}));

const Category = () => {
  // --Contexts
  const state = useContext(UserContext);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [token] = state.token;
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState('');
  const [nameEdit, setNameEdit] = useState('');
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [slug, setSlug] = useState('');
  const [keyword, setKeyword] = useState('');

  // dispatch API
  const actionGetCategories = () => dispatch(getCategories());
  const actionCreateCategory = (data, token) => dispatch(createCategory(data, token));
  const actionDeleteCategory = (slug, token) => dispatch(deleteCategory(slug, token));
  const actionUpdateCategory = (data, token) => dispatch(updateCategory(data, token));

  //store
  const categories = useSelector((state) => state.category.categories);
  const isSuccess = useSelector((state) => state.category.isSuccess);
  const isError = useSelector((state) => state.category.isError);
  const message = useSelector((state) => state.category.message);
  const loading = useSelector((state) => state.category.loading);

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
    } // eslint-disable-next-line
  }, [isError, isSuccess]);

  useEffect(() => {
    actionGetCategories(); // eslint-disable-next-line
  }, []);

  const handleClickOpen = (slug) => {
    setOpen(true);
    setSlug(slug);
  };

  const handleClickDeleteOpen = (slug) => {
    setOpenDelete(true);
    setSlug(slug);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actionCreateCategory({ name }, token);
    actionGetCategories();
    setName('');
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const data = { nameEdit, slug };
    actionUpdateCategory(data, token);
    actionGetCategories();
    setNameEdit('');
    handleClose();
  };

  const handleRemove = () => {
    actionDeleteCategory(slug, token);
    actionGetCategories();
    handleCloseDelete();
  };

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <>
      <Helmet>
        <title>Category</title>
      </Helmet>
      <div className={classes.root}>
        {loading && <SimpleBackdrop />}
        <AdminSidebar />
        <main className={classes.content}>
          <Box display="flex" spacing={1}>
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              title="Tạo mới danh mục"
            />
            <LocalSearch keyword={keyword} setKeyword={setKeyword} placeholder="Tên danh mục" />
          </Box>

          {/* step 5 */}
          <Box m="0.5rem">
            <Typography variant="body1">Danh sách danh mục&nbsp;({categories.length})</Typography>
            {categories.length > 0 &&
              categories.filter(searched(keyword)).map((c, index) => (
                <div className={classes.wrapper} key={c.slug}>
                  <div className={classes.item}>
                    <p>{c.name}</p>
                    <div className={classes.itemBtn}>
                      <IconButton onClick={() => handleClickOpen(c.slug)} size="small">
                        <EditIcon color="primary" />
                      </IconButton>
                      <IconButton onClick={() => handleClickDeleteOpen(c.slug)} size="small">
                        <DeleteOutlineIcon color="secondary" />
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))}
            {/* box edit */}
            <Box>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth
              >
                <DialogTitle id="form-dialog-title">Cập nhật danh mục</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Danh mục"
                    fullWidth
                    value={nameEdit}
                    onChange={(e) => setNameEdit(e.target.value)}
                    variant="outlined"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Đóng
                  </Button>
                  <Button onClick={handleSubmitEdit} color="primary">
                    Lưu
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
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

export default Category;
