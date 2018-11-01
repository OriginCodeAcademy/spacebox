const axios = require('axios');

export const updateUsername = (value) => ({
    type: 'UPDATE_USERNAME',
    payload: value,
})

export const updatePassword = (value) => ({
    type: 'UPDATE_PASSWORD',
    payload: value,
})

export const postLogin = (userData) => {
    return {
        type: 'POST_LOGIN',
        payload: axios.post('api/users/login', userData)
        .then(response => {
            return response.data
        })
    }
}
