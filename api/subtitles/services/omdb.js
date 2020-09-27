'use strict'

const fetch = require('node-fetch')

// TODO: Move to env var
const BASE_OMDB_URL = 'http://www.omdbapi.com';
const OMDB_API_KEY  = process.env.OMDBAPI_KEY;

const search = async (term) => {
  const result = await fetch(`${BASE_OMDB_URL}/?s=${term}&apikey=${OMDB_API_KEY}`).then(r => JSON.parse(r))

  if (result.Response === 'True') {
    return result.Search.filter(item => (item.Type === 'series' || item.Type === 'movie'))
  } else {
    return []
  }
}

module.exports = {
  search,
}
