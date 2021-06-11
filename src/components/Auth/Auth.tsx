import React, {ChangeEventHandler, SyntheticEvent, useState} from 'react';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container
} from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import {signin, signup} from '../../redux/actions/auth';
import Icon from './Icon';
import useStyles from './styles';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Auth = () => {
const classes = useStyles();
const [showPassword, setShowPassword] = useState(false);
const [isSignup, setIsSignUp] = useState(false);
const [formData, setFormData] = useState(initialState);
const dispatch = useDispatch();
const history: any = useHistory();
const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
const handleSubmit = (e: SyntheticEvent) => {
  e.preventDefault();

  if(isSignup) {
    dispatch(signup(formData, history));
  } else {
    dispatch(signin(formData, history));
  }
};
const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
  const target = e.target as typeof e.target & {
    firstName: {value : string};
    lastName: {value: string};
    email: { value: string };
    password: { value: string };
    confirmPassword: {value: string};
  };
  setFormData({...formData, [target.name]: target.value});
};
const switchMode = () => {
  setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  setShowPassword(false);
};
const googleSuccess = async (res: any) => {
  const result = res?.profileObj;
  const token = res?.tokenId;

  try {
    dispatch({type: 'AUTH', payload: {result, token}});
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};
const googleFailure = () => {console.log('Google login has failed')};
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignup ? 'Sign Up' : 'Sign In'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} half autoFocus />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            clientId="918011258704-76c9mmvkglloj28im3thprfdghdmrgr6.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Button onClick={switchMode}>
              {isSignup ? 'Already have an account?' : `Don't have an account?`}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
};

export default Auth;