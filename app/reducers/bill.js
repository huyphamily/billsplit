import {
  GET_BILLS_REQUEST,
  GET_BILLS_SUCCESS,
  GET_BILLS_FAILURE } from 'constants/index';

export default function bill(state = {
  Debts: [],
  Credits: []
}, action) {
  switch (action.type) {
    case GET_BILLS_REQUEST:
      return { ...state, isFetching: true };
    case GET_BILLS_SUCCESS: {
      const { Debts, Credits } = action.req.data;
      return { ...state, Debts, Credits, isFetching: false };
    }
    case GET_BILLS_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
}
