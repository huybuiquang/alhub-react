import axios from 'axios'

export default{
    user:{
        login: (credentials)=>
            axios.post('/api/auth',{credentials}).then(res=>res.data.user),
        signup: user=>
            axios.post('/api/users',{user}).then(res=>res.data.user),
        confirm: token=>{
            return axios.post('/api/auth/confirmation',{token}).then(res=>res.data.user)
        },
        resetPasswordRequest : email=> 
            axios.post('/api/auth/reset_password_request',{email}),
        resetPassword : data=> 
            axios.post('/api/auth/reset_password',{data}),            
        validateToken : token=> 
            axios.post('/api/auth/validate_token',{token}),
        fetchCurrentUser: () =>
            axios.get('/api/users/current_user').then(res => res.data.user)
    },
    
}