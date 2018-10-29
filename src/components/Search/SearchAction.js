'use strict';
const axios = require('axios');

export function updateSearchType(searchType) {
  return {
    type: 'UPDATE_SEARCH_TYPE',
    payload: searchType
  }
}

export function updateSearch(search) {
  return {
    type: 'UPDATE_SEARCH',
    payload: search
  }
}

