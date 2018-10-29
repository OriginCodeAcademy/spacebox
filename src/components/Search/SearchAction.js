//const dotenv = require('dotenv').config();
const axios = require ("axios");


export function handleApiCall(Artist) {
  return {
    type: "NEW_CALL",
    payload: axios.get(`/api/${Artist}`)
  }
}

export function updateInput(input) {
  return {
      type: 'NEW_INPUT',
      payload: input
  };
} 

