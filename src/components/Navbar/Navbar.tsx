import React, {useState, useEffect} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {AppBar, Avatar, Button, Typography, Toolbar} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';
import bouquinistes from '../../images/book.png';

import useStyles from './styles';

export type UserProfile = {
 result:{
  email: string,
  familyName?: string,
  givenName?: string,
  googleId?: string,
  imageUrl?: string,
  name: string,
  password?: string,
  __v?: number,
  _id?:number
 },
 token: string
}

const Navbar = () => {
  const classes = useStyles();

  const localProfile: string | null =  localStorage.getItem('profile');
  const userProfile: UserProfile | null = localProfile === null ? null : JSON.parse(localProfile);

  const [user, setUser] = useState(userProfile);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleLogOut = () => {
    dispatch({type: 'LOGOUT'});
    history.push('/');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if(token) {
      const decodedToken: any = decode(token);
      console.log(decodedToken);

      if(decodedToken.exp * 1000 < new Date().getTime()) handleLogOut();
    }

    setUser(userProfile);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, user?.token])
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Notes</Typography>
        <img className={classes.image} src={bouquinistes} alt="icon" width="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleLogOut}>
              Log Out
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;