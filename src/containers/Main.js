import { useState, useEffect } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { SESSION_ACTIONS } from '../actions/types';

import AppToolbar from '../components/AppToolbar';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

function Main({ isLoggedIn, logout, push }) {
  const [open, setOpen] = useState(false);

  const handleLogin = () => {
    push('/login');
  };

  useEffect(() => {
    isLoggedIn && setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled">
          User successfully logged in
        </Alert>
      </Snackbar>
      <AppToolbar
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={logout}
      />
    </>
  );
}

Main.propTypes = {
  isLoggedIn: bool.isRequired,
  logout: func.isRequired,
  push: func.isRequired,
};

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.getIn(['session', 'username']),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: SESSION_ACTIONS.LOGOUT }),
    push: path => dispatch(push(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
