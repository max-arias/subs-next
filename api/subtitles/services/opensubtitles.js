const OpenSubtitles = require('opensubtitles-api');

const getSubs = async (imdbId) => {
  const subs = new OpenSubtitles({
    useragent: process.env.OPENSUBTITLES_USERAGENT
  });

  const subs_found = await subs.search({ imdbid: imdbId });

  const subtitles = Object.keys(subs_found).map((key) => (
    {
      data: subs_found[key],
      language: subs_found[key].langcode,
      imdbId,
      provider: 'opensubtitles',
    }
  ));

  return subtitles;
}

module.exports = {
  getSubs,
}
