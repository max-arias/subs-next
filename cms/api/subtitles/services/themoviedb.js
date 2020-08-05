'use strict'

const rp = require('request-promise');

const BASE_MOVIE_DB_URL = 'https://api.themoviedb.org/3';
const MOVIE_DB_API_KEY  = process.env.MOVIE_DB_KEY;

const search = async (term) => {
  const url = `${BASE_MOVIE_DB_URL}/search/multi?query=${term}&api_key=${MOVIE_DB_API_KEY}&include_adult=false`;
  const res = await rp(url);
  const result = await res.json()

  return { result }
}

const findByIMDB = async (imdbid) => {
  const url = `${BASE_MOVIE_DB_URL}/find/${imdbid}?language=en-US&external_source=imdb_id&api_key=${MOVIE_DB_API_KEY}`;
  const result = await rp(url).then(res => JSON.parse(res))

  return result;
}

const getDetailsById = async (id, type = 'movie', language = 'en-US') => {
  const url = `${BASE_MOVIE_DB_URL}/${type}/${id}?language=${language}&api_key=${MOVIE_DB_API_KEY}`;
  const result = await rp(url).then(res => JSON.parse(res))

  return result;
}

module.exports = {
  search,
  findByIMDB,
  getDetailsById,
}
