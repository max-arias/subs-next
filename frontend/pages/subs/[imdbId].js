import React from 'react';
import { useRouter } from 'next/router';

import Spinner from '../../assets/svg/spinner.svg';

const Subs = ({ mediaData, subtitles }) => {
  const router = useRouter();
  const loading = router.isFallback;

  console.log(mediaData)
  console.log(subtitles)

  const minutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    let formatedMinutes = minutes - (hours * 60);
    formatedMinutes = String(formatedMinutes).padStart(2, '0');
    return `${hours}h ${formatedMinutes}m`;
  }

  return (
    <div className="w-full h-screen font-sans">
      {loading ? (
        <div className="w-full flex justify-center">
          <Spinner className="animate-spin -ml-1 mr-3 h-10 w-10 text-purple-700" />
        </div>
      ) : (
        <div className="w-full h-screen">
          <div
            className="w-full"
            style={{
              backgroundImage: `url("http://image.tmdb.org/t/p/original/${mediaData.data.backdrop_path}")`,
              backgroundPosition: 'top',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}>
              <div className="p-10 lg:p-20 text-white w-full" style={{ textShadow: '1px 1px 2px black' }}>
                <div className="flex">
                  <img className="hidden lg:block rounded mr-3" src={`http://image.tmdb.org/t/p/w185/${mediaData.data.poster_path}`} alt={mediaData.title} style={{ minWidth: 185 }} />
                  <div>
                    <h1 className="font-bold text-4xl mb-2">{mediaData.title}</h1>
                    <p>{mediaData.data.genres.map(g => g.name).join(" | ")}</p>
                    <p>{minutesToHours(mediaData.data.runtime)}</p>
                    <p>{mediaData.data.overview}</p>
                  </div>
                </div>
              </div>
          </div>
          <div className="w-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {Object.keys(subtitles).map(provider => {
              return (
                <div key={provider}>
                  <h3 className="capitalize text-2xl text-center">{provider}</h3>
                  <ul className="border rounded">
                    {subtitles[provider].map(sub => {
                      return (
                        <li className="p-1" key={sub.data.id}>
                          <a className="pr-1" href={sub.data.url} target="_blank" rel="noopener">{sub.data.filename}</a>
                          <span className="pr-1">Downloads: {sub.data.downloads}</span>
                          <span className="pr-1">Language: {sub.data.lang}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export async function getStaticPaths() {
  const API_URL = process.env.API_URL || '/';

  const data = await fetch(`${API_URL}/media-items`);
  const mediaItems = await data.json();

  // Get the paths we want to pre-render based on suggestions
  const paths = mediaItems.map(mediaItem => ({
    params: { imdbId: mediaItem.imdbId },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps(ctx) {
  const { imdbId } = ctx.params;
  let mediaData = null;
  let subtitles = null;

  if (imdbId) {
    const API_URL = process.env.API_URL || '/';

    const data = await fetch(`${API_URL}/media-items?imdbId=${imdbId}`);
    mediaData = await data.json().then(res => res ? res[0] : null)

    const subtitleData = await fetch(`${API_URL}/subtitles?imdbId=${imdbId}`);
    subtitles = await subtitleData.json();
    subtitles = subtitles.reduce((acc, subtitle) => {
      if (!acc[subtitle.provider]) {
        acc[subtitle.provider] = []
      }

      acc[subtitle.provider].push(subtitle)
      return acc
    }, {})
  }

  return { props: { mediaData, subtitles }, revalidate: 1 };
}

export default Subs;


// "backdrop_sizes": [
//   "w300",
//   "w780",
//   "w1280",
//   "original"
// ],
// "logo_sizes": [
//   "w45",
//   "w92",
//   "w154",
//   "w185",
//   "w300",
//   "w500",
//   "original"
// ],
// "poster_sizes": [
//   "w92",
//   "w154",
//   "w185",
//   "w342",
//   "w500",
//   "w780",
//   "original"
// ],
// "profile_sizes": [
//   "w45",
//   "w185",
//   "h632",
//   "original"
// ],
// "still_sizes": [
//   "w92",
//   "w185",
//   "w300",
//   "original"
// ]
