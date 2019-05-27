import OpenSubtitles from 'opensubtitles-api';

// This is imported only on the server side

const getSubs = async (imdbid) => {
  const subs = new OpenSubtitles({
    // user: 'username',
    // password: 'password',
    // language: 'en',
    useragent: 'TemporaryUserAgent'
  });

  const subs_found = await subs.search({
    /*sublanguageid: 'fre',       // Can be an array.join, 'all', or be omitted.
    hash: '8e245d9679d31e12',   // Size + 64bit checksum of the first and last 64k
    filesize: '129994823',      // Total size, in bytes.
    path: 'foo/bar.mp4',        // Complete path to the video file, it allows
                                //   to automatically calculate 'hash'.
    filename: 'bar.mp4',        // The video file name. Better if extension
                                //   is included.
    season: '2',
    episode: '3',
    extensions: ['srt', 'vtt'], // Accepted extensions, defaults to 'srt'.
    limit: '3',                 // Can be 'best', 'all' or an
    arbitrary nb. Defaults to 'best'
    fps: '23.96',               // Number of frames per sec in the video.
    query: 'Charlie Chaplin',   // Text-based query, this is not recommended.
    gzip: true                  // returns url to gzipped subtitles, defaults to false */
    imdbid: imdbid,           // 'tt528809' is fine too.
  });

  const subtitles = Object.keys(subs_found).map( (key) => (
    {
      url: subs_found[key]['url'],
      langcode: subs_found[key]['langcode'],
      lang: subs_found[key]['lang'],
      filename: subs_found[key]['filename'],
      format: subs_found[key]['format'],
      format: subs_found[key]['format'],
      utf8: subs_found[key]['utf8'],
      score: subs_found[key]['score'],
      imdbid,
    }
  ));

  return subtitles;
}

module.exports = {
  getSubs,
}
