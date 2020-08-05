import React from 'react'
import { useRouter } from 'next/router'

import Spinner from '../../assets/svg/spinner.svg';

const Subs = ({ mediaData }) => {
  const router = useRouter();
  const loading = router.isFallback;

  return (
    <div className="w-full max-w-screen-xl mx-auto px-6 font-sans">

      {loading ? (
        <div className="w-full flex justify-center mt-4">
          <Spinner className="animate-spin -ml-1 mr-3 h-10 w-10 text-purple-700" />
        </div>
      ) : (
        <em>
          {JSON.stringify(mediaData)}
        </em>
      )}
    </div>
  )
}

export async function getStaticPaths() {
  const API_URL = process.env.API_URL || '/'

  const data = await fetch(`${API_URL}/media-items`);
  const mediaItems = await data.json()

  // Get the paths we want to pre-render based on suggestions
  const paths = mediaItems.map((mediaItem) => ({
    params: { imdbId: mediaItem.imdbId },
  }));

  console.log('paths', paths)

  return { paths, fallback: true }
}

export async function getStaticProps(ctx) {
  const { imdbId } = ctx.params;
  let mediaData = null;

  if (imdbId) {
    const API_URL = process.env.API_URL || '/'

    const data = await fetch(`${API_URL}/media-items?imdbId=${imdbId}`)
    mediaData = await data.json()
    mediaData = mediaData && mediaData[0] && mediaData[0].data ? mediaData[0].data : null
  }

  return { props: { mediaData }, revalidate: 1 }
}

export default Subs;
