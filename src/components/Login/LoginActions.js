const axios = require('axios');

export const updateUsername = (value) => ({
    type: 'UPDATE_USERNAME',
    payload: value,
})

export const updatePassword = (value) => ({
    type: 'UPDATE_PASSWORD',
    payload: value,
})

export const postLogin = (userData) => ({
    type: 'POST_lOGIN',
    payload: axios.post('api/players/login', userData)
    .then(response => response.data)
})