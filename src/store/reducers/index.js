import { combineReducers } from 'redux';
import projectReducer from './projectReducer';
import skillReducer from './skillReducer';
import blogReducer from './blogReducer';
import drawerReducer from './drawerReducer';
import authReducer from './authReducer';

const reducer = combineReducers({
  projectReducer,
  skillReducer,
  blogReducer,
  drawerReducer,
  authReducer,
});

export default reducer;
