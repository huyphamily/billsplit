import {
  GET_BILLS_REQUEST,
  GET_BILLS_SUCCESS,
  GET_BILLS_FAILURE,
  ADD_BILL_REQUEST,
  ADD_BILL_SUCCESS,
  ADD_BILL_FAILURE } from 'constants/index';

export default function bill(state = {
  Debts: [],
  Credits: []
}, action) {
  switch (action.type) {
    case GET_BILLS_REQUEST:
      return { ...state, isFetching: true };
    case GET_BILLS_SUCCESS: {
      const { Debts, Credits } = action.result.data;
      return { ...state, Debts, Credits, isFetching: false };
    }
    case GET_BILLS_FAILURE:
      return { ...state, isFetching: false };
    case ADD_BILL_REQUEST:
      return { ...state, isSubmitting: true };
    case ADD_BILL_SUCCESS:
      return { ...state, isSubmitting: false };
    case ADD_BILL_FAILURE:
      return { ...state, isSubmitting: false };
    default:
      return state;
  }
}
