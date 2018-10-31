'use strict';
const axios = require('axios');

export function updateSearchType(searchType) {
    return {
        type: 'UPDATE_SEARCH_TYPE',
        payload: searchType
    }
}

export function updateSearch(searchStr) {
    return {
        type: 'UPDATE_SEARCH',
        payload: searchStr
    }
}

export function getSearch(searchType, searchStr) {
    return {
        type: 'GET_SEARCH',
        payload: axios.get(`/search/${searchType}/${searchStr}`)
    }
}

