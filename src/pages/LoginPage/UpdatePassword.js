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
import SimpleBackdrop from 'components/Backdrop/Backdrop';
import { Form } from 'components/Form/Form';
import { Input } from 'components/Input/Input';
import { SignupBtn } from 'components/UI/Button/Button';
import { useData } from 'contexts/DataContext';
import { registerUser } from 'features/User/pathAPI';
import { clearState } from 'features/User/UserSlice';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
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

const tokenLocal = localStorage.getItem('token');

const UpdatePassword = ({ location }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const actionRegisterAccount = (account) => dispatch(registerUser(account));

  //store
  const loading = useSelector((state) => state.user.loading);
  const isSuccess = useSelector((state) => state.user.isSuccess);
  const isError = useSelector((state) => state.user.isError);
  const message = useSelector((state) => state.user.message);

  // snackbar
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(message, { variant: 'error' });
      dispatch(clearState());
    }

    if (isSuccess) {
      enqueueSnackbar(message, { variant: 'success' });
      dispatch(clearState());
    }
  }, [isError, isSuccess]);

  //useEffect
  useEffect(() => {
    if (tokenLocal) {
      history.push('/');
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    document.getElementById('email').addEventListener('blur', (e) => {
      let email = e.target.value.toLowerCase();
      setValue('email', email);
    });
  }, [tokenLocal, history]);

  //function
  const onSubmit = async (values) => {
    const fullName = await (values.firstName + ' ' + values.lastName);
    const data = {
      name: fullName,
      email: values.email.toLowerCase().trim(),
      password: values.password,
    };
    if (values) {
      setValues(values);
      actionRegisterAccount(data);
    }
  };

  // context data
  const { setValues, data } = useData();

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
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    },
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
          <Typography variant="h5">
            <b>Sign up</b>
          </Typography>
          <Typography variant="body1">It's quick and easy.</Typography>
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
              <SignupBtn disabled={isSubmitting}>Sign Up</SignupBtn>
              {isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Box>
          </Form>
          <Box mt={3} display="flex" justifyContent="center">
            <Typography variant="body2">Have an account?&nbsp;</Typography>
            <Link to="/login">
              <Typography variant="body2" color="secondary">
                <b> Log in </b>
              </Typography>
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UpdatePassword;
