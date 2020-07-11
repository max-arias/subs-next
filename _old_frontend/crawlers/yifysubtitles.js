const rp = require('request-promise')
const cheerio = require('cheerio')
const jsonframe = require('jsonframe-cheerio')

const BASE_URL = 'http://www.yifysubtitles.com';

const fetchUrl = (imdb) => {
  return rp(`${BASE_URL}/movie-imdb/${imdb}`)
}

const crawl = async (imdb) => {
  const body = await fetchUrl(imdb);
  const $ = cheerio.load(body)
  jsonframe($)

  const table = $('.table-responsive')

  if (!table.length) {
    return {
      error: true,
      message: 'Page format changed or no subs found.',
      subs: [],
    }
  }

  const frame = {
    subs: {
      _s: ".table-responsive table tbody tr",
      _d: [{
        "lang": "td.flag-cell .sub-lang",
        "filename": "td:nth-of-type(3)",
        "download": "td.download-cell a @ href"
      }]
    }
  }

  const result = table.scrape(frame)

  if (result && result.subs) {
    return {
      error: false,
      subs: result.subs,
    }
  }

  return {
    error: false,
    message: 'No subs found',
    subs: [],
  }
}

module.exports = {
  crawl,
}
