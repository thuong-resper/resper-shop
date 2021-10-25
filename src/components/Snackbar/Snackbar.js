import { clearState } from 'features/User/UserSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export function ShowSnackbar({ isSuccess, isError }) {
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState();

  const [variant, setVariant] = useState(null);
  const dispatch = useDispatch();

  const openSnackBar = (msg) => {
    setMessage(msg);
    setIsActive(true);
    dispatch(clearState());
  };

  useEffect(() => {
    if (isError) {
      setVariant('error');
      dispatch(clearState());
    }

    if (isSuccess) {
      setVariant('success');
      dispatch(clearState());
    }
  }, [isError, isSuccess, dispatch]);

  return { isActive, message, openSnackBar, variant };
}
