import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import AlertContext, { AlertParams } from 'components/AlertContext';

const timeout = 5000;

interface Props {
  children: React.ReactNode;
}
const WithAlert = ({ children }: Props) => {
  const [state, setState] = React.useState({
    isOpen: false,
    isError: false,
    message: '',
  });

  const close = () => {
    setState({
      isOpen: false,
      isError: false,
      message: '',
    });
  };

  const onSuccess: AlertParams['onSuccess'] = (messageToShow) => {
    if (state.isOpen) {
      close();
      setTimeout(() => {
        setState({
          isOpen: true,
          isError: false,
          message: messageToShow,
        });

        setTimeout(close, timeout);
      }, 450);
    } else {
      setState({
        isOpen: true,
        isError: false,
        message: messageToShow,
      });

      setTimeout(close, timeout);
    }
  };

  const onFailure: AlertParams['onFailure'] = (messageToShow) => {
    if (state.isOpen) {
      close();
      setTimeout(() => {
        setState({
          isOpen: true,
          isError: true,
          message: messageToShow,
        });

        setTimeout(close, timeout);
      }, 450);
    } else {
      setState({
        isOpen: true,
        isError: true,
        message: messageToShow,
      });

      setTimeout(close, timeout);
    }
  };

  return (
    <AlertContext.Provider value={{ onSuccess, onFailure }}>
      {children}
      <Snackbar open={state.isOpen} autoHideDuration={timeout} onClose={close}>
        <MuiAlert onClose={close} severity={state.isError ? 'error' : 'success'}>
          {state.message}
        </MuiAlert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export default React.memo(WithAlert);
