import { stringify } from "querystring";

//const dotenv = require('dotenv').config();
const axios = require ("axios");


export function dbSearch(type, query) {
  console.log('inside action', type);
  return {
    type: "DB_SEARCH",
    payload: axios.get(`/api/Songs?filter={"where":{"${type}":"${query}"}}`).then(response => response.data)
  }
}
export function handleSpotifyCall() {
  return {
    type: "SEARCH_SPOTIFY",
    payload: data
  }
}
export function updateType(type) {
  return {
    type: "UPDATE_TYPE",
    payload: type
  }
}
export function updateQuery(query) {
  return {
    type: "UPDATE_QUERY",
    payload: query
  }
}
export function addToQueue(uri, userId) {
  return {
    type: "ADD_TO_QUEUE",
			
    payload: axios.post(`/api/Songs/getTrackData`, {songUri: `${uri}`, userId: `${userId}`}) //THIS NEEDS AN AXIOS CALL TO ULGAS REMOTE METHEOD
  }
}
export function spotifySearch(type, query) {
  return {
    type: "SPOTIFY_SEARCH",
    payload: axios.get(`/api/Spotify/${type}/{${query}}`)
   

  }
}
