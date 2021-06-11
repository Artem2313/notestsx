import {makeStyles, Theme} from '@material-ui/core/styles';
import {deepPurple} from '@material-ui/core/colors';

export default makeStyles((theme: Theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
    [theme.breakpoints.down(768)]: {
      fontSize: '24px'
    }
  },
  image: {
    marginLeft: '15px',
    [theme.breakpoints.down(768)]: {
      display: 'none'
    }
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down(768)]: {
      width: '250px'
    }
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    [theme.breakpoints.down(768)]: {
      width: '100%',
      alignItems: 'center'
    }
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down(768)]: {
      display: 'none'
    }
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    [theme.breakpoints.down(768)]: {
      marginRight: '30px'
    }
  },
}));