/* eslint consistent-return: 0, no-else-return: 0*/
import * as types from 'constants/index';

// Fetch posts logic
export function fetchBills() {
  return {
    type: types.GET_BILLS,
    promise: (client) => client.get('/bill')
  };
}
