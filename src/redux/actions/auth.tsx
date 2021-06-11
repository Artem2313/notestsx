import {AUTH} from '../constants/actionTypes';
import * as api from '../../api/index';
import {Dispatch, FormData} from '../../types';

export const signin = (formData: FormData, history: any) => async (dispatch: Dispatch) => {
  try {
    const {data} = await api.signIn(formData);

    dispatch({type: AUTH, payload: data});

    history.push('/')
  } catch (error) {
    console.log('signin error');
  }
}

export const signup = (formData: FormData, history: any) => async (dispatch: Dispatch) => {
  try {
    const {data} = await api.signUp(formData);

    dispatch({type: AUTH, payload: data});

    history.push('/')
  } catch (error) {
    console.log('signup error');
  }
}