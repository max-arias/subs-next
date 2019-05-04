'use strict'

import fetch from 'isomorphic-unfetch'

const BASE_OMDB_URL = 'http://www.omdbapi.com';
const OMDB_API_KEY  = process.env.OMDBAPI_KEY;

const search = async (term) => {
  const res = await fetch(`${BASE_OMDB_URL}/?s=${term}&apikey=${OMDB_API_KEY}`);
  const result = await res.json()

  console.log(result);

  return { result: result.Search }
}

module.exports = {
  search,
}
