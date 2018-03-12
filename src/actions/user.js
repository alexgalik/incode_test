import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    USER_LOGGED_IN_FAILED
} from "../types";
import api from "../api";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";

export const userLoggedIn = user => ({
    type: USER_LOGGED_IN,
    user
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});

export const userLoggedInErrors = errors => ({
    type: USER_LOGGED_IN_FAILED,
    errors
})

export const login = credentials => dispatch =>
    api.user.login(credentials)
    .then(data => {
        if (data.user) {
            localStorage.JWT = data.user.token;
            setAuthorizationHeader(data.user.token);
            dispatch(userLoggedIn({ ...data.user}));
        }else {
            dispatch(userLoggedInErrors(data.errors));
        }
    })

export const logout = () => dispatch => {
    localStorage.removeItem("JWT");
    setAuthorizationHeader();
    dispatch(userLoggedOut());
};

export const fetchCurrentUserRequest = () => dispatch => {
    api.user.fetchCurrentUser()
    .then(data => {
        if (data.email){
            dispatch(userLoggedIn({ ...data}));
        }
    })
}