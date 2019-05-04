const MoviesAndShows = use('App/Models/MoviesAndShows');

const OpenSubtitles = require('opensubtitles-api');

const BASE_OMDB_URL = 'http://www.omdbapi.com';

class OpenSubtitlesService {
    static async getSubs(imdb_id) {
        // TODO: Clean this up, abstract it?

        let movieOrShow = MoviesAndShows.findBy('imdb_id', imdb_id);

        if (!movieOrShow) {
            const OMDB_API_KEY  = Env.get('OMDBAPI_KEY', '');
            
            const url = `${BASE_OMDB_URL}/?i=${imdb_id}&apiKey=${OMDB_API_KEY}`;
            const res = await rp(url);

            movieOrShow = new MoviesAndShows();
            movieOrShow.title = res.title;
            movieOrShow.imdb_id = res.imdbID;
            movieOrShow.year = res.Year;
            movieOrShow.genre = res.Genre;
            movieOrShow.plot = res.Plot;
            movieOrShow.poster = res.Poster;
            movieOrShow.meta_score = res.Metascore;
            movieOrShow.imdb_score = res.imdbRating;

            await newMovieOrShow.save();
        }


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
            imdbid: imdb_id,           // 'tt528809' is fine too.
        });

        const subs_found_formatted = [];
        
        Object.keys(subs_found_formatted).map( (key) => {
            out.push({
                url: subs_found_formatted[key]['url'],
                language: subs_found_formatted[key]['langcode'],
                imdb_id: imdb_id,
                site: 'os'
            })
        });

        //TODO: Check length vs what we have in the db, update if necessary
        //TODO: Add static cache, memcached or something

        subs_found_formatted.forEach(function (value) {
            //TODO: insert these
        });

        /*
        Example of subs found from OpenSubs:
        
        {
            "pb": {
                "url": "http://dl.opensubtitles.org/en/download/src-api/vrf-196b0c49/sid-cLNg,oS196W1rQpaak78qK1khKb/filead/1952000168",
                "langcode": "pb",
                "downloads": 9313,
                "lang": "Portuguese (BR)",
                "encoding": "CP1252",
                "id": "1952000168",
                "filename": "Saw.DVDRip.SubRip.srt",
                "date": "2008-12-25 01:30:40",
                "score": 9,
                "fps": 23.98,
                "format": "srt"
            },
            "en": {
                "url": "http://dl.opensubtitles.org/en/download/src-api/vrf-19c70c5b/sid-cLNg,oS196W1rQpaak78qK1khKb/filead/1951971449",
                "langcode": "en",
                "downloads": 48776,
                "lang": "English",
                "encoding": "ASCII",
                "id": "1951971449",
                "filename": "Saw[2004]DvDrip-aXXo.en.srt",
                "date": "2008-11-15 03:15:55",
                "score": 9,
                "fps": 23.98,
                "format": "srt"
            }    
        }
        */

        return out;
    } 
}

module.exports = OpenSubtitlesService;
