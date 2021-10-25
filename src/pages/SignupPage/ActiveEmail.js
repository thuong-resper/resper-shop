import { unwrapResult } from '@reduxjs/toolkit';
import { UserContext } from 'contexts/UserContext';
import { postActiveEmail } from 'features/User/pathAPI';
import { clearState } from 'features/User/UserSlice';
import { useSnackbar } from 'notistack';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import SimpleBackdrop from '../../components/Backdrop/Backdrop';

const tokenLocal = localStorage.getItem('token');

export default function ActiveEmail() {
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

  // store
  const loading = useSelector((state) => state.user.loading);
  const isSuccess = useSelector((state) => state.user.isSuccess);
  const isError = useSelector((state) => state.user.isError);
  const message = useSelector((state) => state.user.message);

  //useEffect
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

  useEffect(() => {
    async function activeEmail() {
      if (token && patchCart) {
        history.push(patchCart);
      } else if (tokenLocal || token) {
        history.push('/');
      }
      if (accessToken) {
        const actionResult = await dispatch(postActiveEmail({ accessToken: accessToken }));
        const currentUser = unwrapResult(actionResult);
        if (currentUser) {
          setToken(currentUser.token);
          setUser(currentUser.user);
          setIdUser(currentUser.user._id);
        }
      }
    }
    activeEmail(); // eslint-disable-next-line
  }, [accessToken, token]);

  return loading && <SimpleBackdrop />;
}
