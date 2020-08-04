import React from 'react'
import { useRouter } from 'next/router'

import Search from '../components/Search'

const Index = ({ suggestionData }) => {
  const router = useRouter();
  const loading = router.isFallback;

  return (
    <div className="w-full max-w-screen-xl mx-auto px-6 font-sans">
      <Search suggestionData={suggestionData} loading={loading} />
    </div>
  )
}

export async function getStaticPaths() {
  const API_URL = process.env.API_URL || '/'

  const data = await fetch(`${API_URL}/suggestions`);
  const suggestions = await data.json()

  // Get the paths we want to pre-render based on suggestions
  const paths = suggestions.map((suggestion) => ({
    params: { searchTerm: suggestion.keyword },
  }));

  return { paths, fallback: true }
}

export async function getStaticProps(ctx) {
  const { searchTerm } = ctx.params;
  let suggestionData = null;

  if (searchTerm) {
    const API_URL = process.env.API_URL || '/'

    const data = await fetch(`${API_URL}/suggestions?keyword=${searchTerm}`)
    suggestionData = await data.json()
    suggestionData = suggestionData && suggestionData[0] && suggestionData[0].data ? suggestionData[0].data : null
  }

  return { props: { suggestionData }, revalidate: 1 }
}

export default Index;
