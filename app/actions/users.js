import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';
import {addNotification as notify} from 'reapop';

import * as types from 'constants';

polyfill();

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint - defaults to /login
 * @return Promise
 */
function makeUserRequest(method, data, api = '/login') {
  return request({
    url: api,
    method,
    data,
    withCredentials: true
  });
}


// Log In Action Creators
function beginLogin() {
  return { type: types.MANUAL_LOGIN_USER };
}

function loginSuccess() {
  return {
    type: types.LOGIN_SUCCESS_USER
  };
}

function loginError() {
  return {
    type: types.LOGIN_ERROR_USER
  };
}

// Sign Up Action Creators
function signUpError() {
  return {
    type: types.SIGNUP_ERROR_USER
  };
}

function beginSignUp() {
  return { type: types.SIGNUP_USER };
}

function signUpSuccess() {
  return {
    type: types.SIGNUP_SUCCESS_USER
  };
}

// Log Out Action Creators
function beginLogout() {
  return { type: types.LOGOUT_USER};
}

function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS_USER };
}

function logoutError() {
  return { type: types.LOGOUT_ERROR_USER };
}

export function toggleLoginMode() {
  return { type: types.TOGGLE_LOGIN_MODE };
}

export function manualLogin(data) {
  return dispatch => {
    dispatch(beginLogin());

    return makeUserRequest('post', data, '/login')
      .then(response => {
        if (response.status === 200) {
          dispatch(loginSuccess(response.data.message));
          dispatch(notify({ message: response.data.message, status: response.status }));
          dispatch(push('/'));
        } else {
          dispatch(loginError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(loginError(err.data.message));
        dispatch(notify({ message: err.data.message, status: err.status }));
      });
  };
}

export function signUp(data) {
  return dispatch => {
    dispatch(beginSignUp());

    return makeUserRequest('post', data, '/signup')
      .then(response => {
        if (response.status === 200) {
          dispatch(signUpSuccess());
          dispatch(notify({ message: response.data.message, status: response.status }));
          dispatch(push('/dashboard'));
        } else {
          dispatch(signUpError('Oops! Something went wrong'));
        }
      })
      .catch(err => {
        dispatch(signUpError());
        dispatch(notify({ message: err.data.message, status: err.status }));
      });
  };
}

export function logOut() {
  return dispatch => {
    dispatch(beginLogout());

    return makeUserRequest('post', null, '/logout')
      .then(response => {
        if (response.status === 200) {
          dispatch(logoutSuccess());
          dispatch(push('/'));
        } else {
          dispatch(logoutError());
        }
      });
  };
}
