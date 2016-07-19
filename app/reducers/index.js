import { combineReducers } from 'redux';
import user from 'reducers/user';
import message from 'reducers/message';
import bill from 'reducers/bill';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import {reducer as notifications} from 'reapop';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  message,
  routing,
  bill,
  form,
  notifications,
});

export default rootReducer;
