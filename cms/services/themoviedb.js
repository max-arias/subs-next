'use strict'

import fetch from 'isomorphic-unfetch'

const BASE_MOVIE_DB_URL = 'https://api.themoviedb.org/3';
const MOVIE_DB_API_KEY  = process.env.MOVIE_DB_KEY;

const search = async (term) => {
  const res = await fetch(`${BASE_MOVIE_DB_URL}/search/multi?query=${term}&api_key=${MOVIE_DB_API_KEY}&include_adult=false`);
  const result = await res.json()

  return { result }
}

const findByIMDB = async (imdbid) => {
  const url = `${BASE_MOVIE_DB_URL}/find/${imdbid}?language=en-US&external_source=imdb_id&api_key=${MOVIE_DB_API_KEY}`;
  console.log('url', url);

  const res = await fetch(url);
  const result = await res.json();

  return result;
}

const getDetailsByMovieId = async (id) => {
  const url = `${BASE_MOVIE_DB_URL}/movie/${id}?language=en-US&api_key=${MOVIE_DB_API_KEY}`;
  console.log('url', url);

  const res = await fetch(url);
  const result = await res.json();

  return result;
}

module.exports = {
  search,
  findByIMDB,
  getDetailsByMovieId,
}
