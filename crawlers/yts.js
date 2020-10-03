const cheerio = require('cheerio')
const fetch = require('node-fetch')
const { getCodeFromName } = require('../utils/CountryUtils');
const BASE_URL = strapi.config.get('constants.YTS_URL', '/');

const crawl = async (imdbId) => {
  const body = await fetch(`${BASE_URL}/${imdbId}`).then((res) => res.text());
  const $ = cheerio.load(body)

  const table = $('.table.other-subs')

  // No subs
  if (!table.length) {
    return [{
      imdbId,
      language: 'None',
      provider: 'yts',
      data: null,
    }];
  }

  const subs = [];

  $('.table.other-subs').find('tbody tr').each((_, tr) => {
    const languageLong = $(tr).find('.sub-lang').text();
    const language = getCodeFromName(languageLong);
    const filename = $(tr).find('td:nth-child(3)').text().replace(/\n|\t|(subtitle)/igm, '').trim();
    const url = $(tr).find('.subtitle-download').attr('href');

    subs.push({
      imdbId,
      language,
      provider: 'yts',
      data: {
        filename,
        url,
        lang: languageLong,
        score: 0,
      }});
  });

  return subs;
}

module.exports = {
  crawl,
}
