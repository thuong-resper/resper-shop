import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { unwrapResult } from '@reduxjs/toolkit';
import SimpleBackdrop from 'components/Backdrop/Backdrop';
import { Form } from 'components/Form/Form';
import { Input } from 'components/Input/Input';
import { SignupBtn } from 'components/UI/Button/Button';
import { UserContext } from 'contexts/UserContext';
import { putResetPassword } from 'features/User/pathAPI';
import { clearState } from 'features/User/UserSlice';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useStyles } from './styles';
import './styles.css';

//yup validation
const schema = yup.object().shape({
  password: yup
    .string()
    .required('No password provided')
    .min(6, 'Password is too short - should be 6 chars minimum')
    .matches(/(?=.*[0-9])/, 'Password must contain a number'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Password does not match')
    .required('Confirm password is required field'),
});

const CreateAPassword = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { accessToken } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const state = useContext(UserContext);
  // create
  const [token, setToken] = state.token;
  const [, setUser] = state.user;
  const [, setIdUser] = state.idUser;
  const [patchCart] = state.patchCart;

  //store
  const loading = useSelector((state) => state.user.loading);
  const isSuccess = useSelector((state) => state.user.isSuccess);
  const isError = useSelector((state) => state.user.isError);
  const message = useSelector((state) => state.user.message);
  const isAdmin = useSelector((state) => state.user.isAdmin);

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
    } // eslint-disable-next-line
  }, [isError, isSuccess]);

  // useEffect
  useEffect(() => {
    if (token && patchCart) {
      history.push(patchCart);
    }
    if (isAdmin && token) {
      history.push('/admin/dashboard');
    } else {
      history.push('/');
    }
    // eslint-disable-next-line
  }, [accessToken, token]);

  const onSubmit = async (value) => {
    if (value && accessToken) {
      const data = { password: value.password.trim(), accessToken: accessToken };
      const actionResult = await dispatch(putResetPassword(data));
      const currentUser = unwrapResult(actionResult);
      if (currentUser) {
        setToken(currentUser.token);
        setUser(currentUser.user);
        setIdUser(currentUser.user._id);
      }
    }
  };

  //hide and show password field
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleMouseDownPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const handleMouseDownConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const { isSubmitting } = useFormState({ control });

  return (
    <Grid container className={classes.root}>
      {loading && <SimpleBackdrop />}
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        className={classes.pageCenter}
      >
        <Box className={classes.paper}>
          <Typography variant="h5" gutterBottom>
            <b>Create new password</b>
          </Typography>
          <Typography variant="body1">
            Your new password must be different from previous used passwords.
          </Typography>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              name="password"
              error={!!errors.password}
              helperText={errors?.password?.message}
              disabled={isSubmitting}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <Visibility fontSize="small" />
                      ) : (
                        <VisibilityOff fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Input
              {...register('passwordConfirmation')}
              type={showConfirmPassword ? 'text' : 'password'}
              id="passwordConfirmation"
              placeholder="Confirm password"
              name="passwordConfirmation"
              error={!!errors.passwordConfirmation}
              helperText={errors?.passwordConfirmation?.message}
              disabled={isSubmitting}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                    >
                      {showConfirmPassword ? (
                        <Visibility fontSize="small" />
                      ) : (
                        <VisibilityOff fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box position="relative">
              <SignupBtn disabled={isSubmitting}>Reset password</SignupBtn>
              {isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Box>
          </Form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CreateAPassword;
