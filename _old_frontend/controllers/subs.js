'use strict'

import { getSubs as getOsSubs } from '../services/opensubtitles';
import { getSubs as getYifiSubs } from '../services/yify';

import omdb from '../services/omdb';

const search = async (query) => {
  return await omdb.search(query);
};

const getByIMDB = async (imdb, service) => {
  try {
    switch (service) {
      case 'opensubtitles':
        return await getOsSubs(imdb);
      case 'yifi':
        return await getYifiSubs(imdb);
      default:
        console.log(`Did not find service for: ${service}`);
    }
  } catch(e) {
    console.log(e)
  }

  return [];
}


module.exports = {
  getByIMDB,
  search,
}
