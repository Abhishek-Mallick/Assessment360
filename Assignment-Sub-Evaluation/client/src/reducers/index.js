import { combineReducers } from 'redux';
import auth from './auth';
import assignment from './assignment';

export default combineReducers({
  assignment,
  auth,
});
