const { crawl } = require('../../../crawlers/yts');

//TODO: Get these from the DB, not from crawling directly
const getSubs = async (imdbId) => {
  console.log('imdbId', imdbId)
  return await crawl(imdbId);
}

module.exports = {
  getSubs,
}
