import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

//utils imports
import App from './components/App';
import history from './history';
import rootReducer from './rootReducer';
import setAuthorizationHeader from './utils/setAuthorizationHeader';
import { fetchCurrentUserRequest } from './actions/user'

//css imports
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-router-modal/css/react-router-modal.css'

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.JWT) {
    setAuthorizationHeader(localStorage.JWT);
    store.dispatch(fetchCurrentUserRequest());
}


ReactDOM.render(
    <Router history={history}>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('root'));