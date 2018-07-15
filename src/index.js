import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import decode from 'jwt-decode';
import { composeWithDevTools } from 'redux-devtools-extension';
import en from 'react-intl/locale-data/en'
import vi from 'react-intl/locale-data/vi'
import {addLocaleData} from 'react-intl'
import App from './App';
import rootReducer from './rootReducers'
import registerServiceWorker from './registerServiceWorker';
// import { userLoggedIn } from './actions/auth';
import { userFetched, fetchCurrentUserRequest } from './actions/users';
import setAuthorizationHeader from './utils/setAuthorizationHeader';
import { localeSet } from './actions/locale';

addLocaleData(en);
addLocaleData(vi);

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

if(localStorage.bookwormJWT){
    // const payload = decode(localStorage.bookwormJWT);
    // const user = { 
    //     token: localStorage.bookwormJWT,
    //     email: payload.email,
    //     confirmed: payload.confirmed
    // };
    setAuthorizationHeader(localStorage.bookwormJWT);
    store.dispatch(fetchCurrentUserRequest());
}
else{
    store.dispatch(userFetched({}));
}

if(localStorage.alhubLang){
    store.dispatch(localeSet(localStorage.alhubLang));
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route component={App}/>
        </Provider>
        
    </BrowserRouter>, 
    document.getElementById('root'));
registerServiceWorker();
