import {Action} from '../../types';
import {AUTH, LOGOUT} from '../constants/actionTypes';

const authReducer = (state = {authData: null}, action: Action) => {
  switch(action.type) {
    case AUTH:
      console.log('From Reducer', action);
      localStorage.setItem('profile', JSON.stringify({...action?.payload}));
      return {...state, authData: action?.payload};
    case LOGOUT:
      localStorage.clear();
      return {...state, authData: null};
    default:
      return state;
  }
};


export default authReducer;