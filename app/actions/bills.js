/* eslint consistent-return: 0, no-else-return: 0*/
import * as types from 'constants/index';

// Fetch posts logic
export function fetchBills() {
  return {
    type: types.GET_BILLS,
    promise: (request) => request.get('/bill')
  };
}

// Fetch posts logic
export function addBill(data) {
  return {
    type: types.ADD_BILL,
    promise: (request) => request.post('/bill/new', data)
  };
}
