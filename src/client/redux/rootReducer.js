import { combineReducers } from 'redux';
import counterReducer from './counter';
import photoReducer from './photo';

export default combineReducers({
  counterReducer,
  photoReducer,
});
