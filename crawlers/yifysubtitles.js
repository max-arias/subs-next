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
    return `${imdb} not found!`
  }

  const frame = {
    subs: {
      _s: ".table-responsive tbody tr",
      _d: [{
        "language": "td.flag-cell .sub-lang",
        "name": "td:nth-of-type(3)",
        "download": "td.download-cell a @ href"
      }]
    }
  }

  const result = table.scrape(frame, { string: true })

  console.log(result)


}

crawl('tt0432348')

// export default {
//   crawl,
// }
