'use strict'

import themoviedb from '../services/themoviedb';
import omdb from '../services/omdb';

const search = async (query) => {
  return await omdb.search(query);
};


module.exports = {
  search,
}