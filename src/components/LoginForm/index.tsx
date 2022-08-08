import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
  IconButton,
  InputAdornment
} from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import { User } from '../../types/User';
import { useHistory } from 'react-router-dom';

export const userDatabase = [
  {
    id: 1,
    name: 'Jane',
    password: '1234',
    role: 'therapist'
  },
  {
    id: 2,
    name: 'John',
    password: '1234',
    role: 'client'
  },
  {
    id: 3,
    name: 'James',
    password: '1234',
    role: 'client'
  },
  {
    id: 4,
    name: 'Bruce',
    password: '1234',
    role: 'client'
  }
];

const initialState: User = {
  id: 0,
  name: '',
  role: '',
  password: ''
};

const Login = ({ setUser }: any) => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('form data', formData);

    //Find user login information
    const userData = userDatabase.find((user) => user.name === formData.name);
    console.log('The user is', userData);
    if (userData) {
      if (userData.password === formData.password) {
        if (userData.role === 'therapist') {
          console.log('role', userData.role);
          sessionStorage.setItem('user', JSON.stringify(userData));
          window.location.assign('/therapist');
        } else {
          sessionStorage.setItem('user', JSON.stringify(userData));
          window.location.assign('/client');
        }
        setUser(formData);
      } else {
        console.log('wrong password');
        setPasswordError(true);
      }
    } else {
      console.log('user doesnt exist');
      setError(true);
    }
  };

  console.log('error', error);

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5"> Sign In</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="name"
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  label="Name"
                  autoFocus
                  InputProps={{}}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="password"
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  label="Password"
                  autoFocus
                  type="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </Paper>
        {passwordError && (
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setPasswordError(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            className="mb-4"
            severity="error"
          >
            Incorrect Username or Password
          </Alert>
        )}
        {error && (
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setError(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            className="mb-4"
            severity="error"
          >
            User not found
          </Alert>
        )}
      </Container>
    </>
  );
};

export default Login;
