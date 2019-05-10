import { createStore, combineReducers } from 'redux';

// reducers
import userReducer from '../reducers/users';

export default () => {
  const store = createStore(
    combineReducers({
      user: userReducer
    })
  );

  return store;
};
