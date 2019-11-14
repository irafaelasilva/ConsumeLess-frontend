import React from 'react';
import { Redirect } from 'react-router-dom'
import './App.css';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import AuthService from './AuthService';
import { useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#659c35',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#659c35'
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#659c35'
      }
    },
  },
})(TextValidator);

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    color: '#659c35',
    borderBottomColor: '#659c35',
    borderColor: '#659c35'
  },
  submit: {
    '&:hover': {
      backgroundColor: '#45721D'
    },
    backgroundColor: '#659c35',
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {

  let history = useHistory();
  let classes = useStyles();
  let authService = new AuthService()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleUserNameInput = event => {
    setUsername(event.target.value);
  };

  const handlePasswordInput = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let payload = new FormData(event.target)

    authService.login(payload)
      .then(res => history.replace('/categories'))
      .catch(error => handleClickOpen())
  };

  if (authService.loggedIn()){
    return <Redirect to="/categories"/>
  }
  return (
    <div className="App">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <img src={require('../logo-with-name.svg')} />
          <ValidatorForm className={classes.form} noValidate onSubmit={handleSubmit}>
            <CssTextField
              className={classes.inputz}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={username}
              validators={['required']}
              errorMessages={['Username is required']}
              autoFocus
              onChange={handleUserNameInput}
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              validators={['required']}
              errorMessages={['Password is required']}
              onChange={handlePasswordInput}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
          </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </ValidatorForm>
        </div>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Incorrect username or password"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The email and password you entered did not match our records. Please double-check and try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
