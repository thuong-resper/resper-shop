//This JS does some common settings for notistack
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { isMobile } from 'react-device-detect';

/**
 * The maximum number of displayed message bars. If it exceeds, the first opened one will be closed and then the new one will be displayed. It is a queue
 * If you only want to display one, set it to 1, and 3 is the default value
 */
const MAX_SNACKBAR = 3;
//Set the auto hide time, the default value is 5 seconds
const AUTO_HIDE_DURATION = 6000;
//Set the position of the message bar, the default value is the bottom left
const POSITION = {
  vertical: 'bottom',
  horizontal: 'center',
};

export default function NotistackWrapper({ children }) {
  const notistackRef = React.createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <SnackbarProvider
      maxSnack={MAX_SNACKBAR}
      autoHideDuration={AUTO_HIDE_DURATION}
      anchorOrigin={POSITION}
      dense={isMobile}
      ref={notistackRef}
      TransitionComponent={Grow}
      action={(key) => (
        <IconButton key="close" aria-label="Close" color="inherit" onClick={onClickDismiss(key)}>
          <CloseIcon style={{ fontSize: '20px' }} />
        </IconButton>
      )}
    >
      {children}
    </SnackbarProvider>
  );
}
