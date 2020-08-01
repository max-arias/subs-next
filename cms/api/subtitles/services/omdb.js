'use strict'

const rp = require('request-promise');

const BASE_OMDB_URL = 'http://www.omdbapi.com';
const OMDB_API_KEY  = process.env.OMDBAPI_KEY;

const search = async (term) => {
  const result = await rp(`${BASE_OMDB_URL}/?s=${term}&apikey=${OMDB_API_KEY}`).then(r => JSON.parse(r))

  return { result: result.Search }
}

module.exports = {
  search,
}
