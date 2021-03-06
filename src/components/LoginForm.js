import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Paper,
  Button,
  TextField,
  Typography,
  Box,
  Snackbar,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#102a43',
  },
  form: {
    width: '250px',
    height: '250px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'none',
  },
  buttons: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: '10px',
  },
}));

function LoginForm({ push, setUserDetails }) {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const classes = useStyles();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async ({ username, password }) => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        const { username, fullname } = await response.json();
        setUserDetails({ username, fullname });
        push('/');
      } else {
        const content = await response.json();
        setErrorMessage(content.message);
        setOpen(true);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Box className={classes.root}>
        <Paper variant="outlined">
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
            data-testid="loginForm"
          >
            <Typography variant="h5" component="h5" gutterBottom>
              Please log in below
            </Typography>
            <TextField
              {...register('username', { required: true })}
              label="User Name"
              variant="outlined"
              fullWidth
              size="small"
              error={!!errors.username}
              helperText={!!errors.username ? 'User Name is required.' : null}
            />

            <TextField
              {...register('password', { required: true })}
              label="Password"
              variant="outlined"
              fullWidth
              size="small"
              error={!!errors.password}
              helperText={!!errors.password ? 'Password is required.' : null}
            />

            <Box className={classes.buttons}>
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
                type="submit"
                mr={2}
                size="small"
              >
                Log in
              </Button>
              <Button
                className={classes.button}
                color="secondary"
                variant="contained"
                size="small"
                onClick={() => reset()}
              >
                Reset
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </>
  );
}

export default LoginForm;
