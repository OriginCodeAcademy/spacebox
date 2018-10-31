const axios = require('axios');

export function getDefaultQueue(userId) {
  return {
	  type: 'GET_DEFAULT_QUEUE_ID',
	  payload: axios.get(`/api/users/${userId}/queue`)
	    .then(response => response.data.id)
  }
}

export function getDefaultSongs(queueId) {
  return {
	  type: 'GET_DEFAULT_SONGS',
	  payload: axios.get(`/api/Queues/${queueId}/default`)
	    .then(response => response.data)
  }
}

export function deleteDefaultSong(songId, queueId) {
	return {
		type: 'DELETE_DEFAULT_SONG',
		payload: axios.delete(`/api/Queues/${queueId}/default/${songId}`)
	}
}

export function handleAddInput(event) {
	return {
		type: 'GET_INPUT_VALUE',
		payload: event
	}
}

export function addDefaultSong(inputValue, queueId) {
	return {
		type: 'ADD_DEFAULT_SONG',
		payload: axios.post(`/api/Queues/addToDefaultSongs`, {uri: inputValue, queueId: queueId})
	}
}
