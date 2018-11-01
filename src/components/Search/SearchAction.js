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
export function addToQueue(uri, userId, queueId) {
  console.log('userID in add to Queue', userId)
  return {
    type: "ADD_TO_QUEUE",
    payload:
     axios.post(`/api/Songs/getTrackData`, {songUri: `${uri}`, userId: `${userId}`})
   .then (res => {
     console.log('full res in seach action: ', res)
     console.log('queueid in seach action: ', queueId)
     console.log('songid in add to queue action: ', res.data.song[0].id)
      return axios.put(`/api/Queues/updatePlaylist`, {id: `${queueId}`, songId: `${res.data.song[0].id}`})
      .catch(err => console.log('we caught an error in search action: ',err))
   })
      }

}
export function spotifySearch(type, query, userId) {
 console.log('this is type in action: ', type);
 console.log('this is userId in spotifysearch: ', userId);
 console.log('this is query in action: ', query);
  return {
    type: "SPOTIFY_SEARCH",
    payload: axios.get(`/api/Songs/getMoreFromSpotify/`, {
      params: {
        userId: userId,
        query: query,
        types: type,
      }
    })
    .then(res => {
      console.log('action output', res.data)
      return res.data
    })

  }
}
