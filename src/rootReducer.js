import { combineReducers } from 'redux';
import user from './reducer/user';
import groups from './reducer/groups';
import errors from './reducer/errors';

export default combineReducers({
    user,
    groups,
    errors
});