import decode from 'jwt-decode';
import * as types from '../types';
import api from '../api'
import {
    userLoggedIn
} from './auth';

// export const userSignedUp = (user) => ({
//     type: types.USER_SIGNED_UP,
//     user
// })

export const userFetched = (user) =>  ({
       type: types.USER_FETCHED,
       user
});

export const signup = (data) => dispatch => {
    return api.user.signup(data).then(user => {
        localStorage.setItem('bookwormJWT', user.token);
        const payload = decode(user.token);
        dispatch(userLoggedIn({...user, confirmed: payload.confirmed, loaded: true}))
    });
}

export const fetchCurrentUserRequest = () => dispatch =>  {
    return api.user.fetchCurrentUser().then(user => dispatch(userFetched(user)));
};

