const cheerio = require('cheerio');
const fetch = require('node-fetch');
const { getCodeFromName } = require('../utils/CountryUtils');
const BASE_URL = strapi.config.get('constants.YTS_URL', '/');

const crawl = async imdbId => {
  const body = await fetch(`${BASE_URL}/${imdbId}`).then(res => res.text());
  const $ = cheerio.load(body);

  const table = $('.table.other-subs');

  // No subs
  if (!table.length) {
    return [];
  }

  const subs = [];

  $('.table.other-subs')
    .find('tbody tr')
    .each((_, tr) => {
      const language = $(tr).find('.sub-lang').text();
      const langcode = getCodeFromName(language);
      const filename = $(tr)
        .find('td:nth-child(3)')
        .text()
        .replace(/\n|\t|(subtitle)/gim, '')
        .trim();
      const url = $(tr).find('.subtitle-download').attr('href');

      subs.push({
        imdbId,
        language,
        langcode,
        provider: 'yts',
        data: {
          filename,
          url,
          lang: language,
          score: 0,
        },
      });
    });

  return subs;
};

module.exports = {
  crawl,
};
