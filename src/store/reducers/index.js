import { combineReducers } from 'redux';
import projectReducer from './projectReducer';
import skillReducer from './skillReducer';
import customerReducer from './customerReducer';
import drawerReducer from './drawerReducer';
import authReducer from './authReducer';
import alertReducer from './alertReducer';

const reducer = combineReducers({
  projectReducer,
  skillReducer,
  customerReducer,
  drawerReducer,
  authReducer,
  alertReducer,
});

export default reducer;
