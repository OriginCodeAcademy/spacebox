const axios = require("axios");

export function dbSearch(type, query) {
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
  return {
    type: "ADD_TO_QUEUE",
    payload:
      axios.post(`/api/Songs/getTrackData`, { songUri: `${uri}`, userID: `${userId}` })
        .then(res => {
          if (res.data.song[0]) {
            return axios.put(`/api/Queues/updatePlaylist`, { id: `${queueId}`, songID: `${res.data.song[0].id}` })
              .catch(err => alert('We caught an error; song not added.'));
          } else {
            return axios.put(`/api/Queues/updatePlaylist`, { id: `${queueId}`, songID: `${res.data.song.id}` })
              .catch(err => alert('We caught an error; song not added.'));
          }
        })
  }

}
export function spotifySearch(type, query, userId) {
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
        return res.data
      })

  }
}
export function updateData() {
  return {
    type: 'UPDATE_DATA',
    payload: []
  }
}
export function getSongs(queueId) {
  return {
    type: 'GET_SONGS',
    payload: queueId
  }
}
