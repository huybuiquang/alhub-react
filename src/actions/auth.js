import decode from 'jwt-decode';
import * as types from '../types';
import api from '../api'
import setAuthorizationHeader from '../utils/setAuthorizationHeader';

export const userLoggedIn = (user) => ({
    type: types.USER_LOGGED_IN,
    user
})

export const userLoggedOut = () => ({
    type: types.USER_LOGGED_OUT
})

export const login = credentials => dispatch =>
    api.user.login(credentials).then(user => {
        localStorage.setItem('bookwormJWT', user.token);
        setAuthorizationHeader(localStorage.bookwormJWT);
        const payload = decode(user.token);
        dispatch(userLoggedIn({...user, confirmed: payload.confirmed, loaded: true}))
    });

export const logout = () => dispatch => {
    localStorage.removeItem('bookwormJWT');
    dispatch(userLoggedOut())
}

export const confirm = (token) => (dispatch)=>{
    return api.user.confirm(token)
        .then(user => {
            localStorage.setItem('bookwormJWT', user.token);
            dispatch(userLoggedIn(user));
        })
    }

export const resetPasswordRequest = ({email}) => ()=>{
    return api.user.resetPasswordRequest(email);
}

export const resetPassword = (data) => ()=>{
    return api.user.resetPassword(data);
}

export const validateToken= (token)=> ()=>
    api.user.validateToken(token);