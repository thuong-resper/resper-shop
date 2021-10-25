import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const TimeLoadingToRedirect = ({ location }) => {
  const [count, setCount] = useState(5);
  let history = useHistory();

  const redirect = location.search ? location.search.slice(location.search.indexOf('=') + 1) : '/';

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && history.push(redirect);
    // clean up
    return () => {
      clearInterval(interval);
    }; // eslint-disable-next-line
  }, [count]);
  return (
    <Box mt="2rem" textAlign="center">
      <Typography variant="body2">Chuyển hướng trang sau {count} giây...</Typography>
    </Box>
  );
};

export default TimeLoadingToRedirect;
