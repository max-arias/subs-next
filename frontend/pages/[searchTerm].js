import React, {useState} from 'react'

import Search from '../components/Search'

const Index = ({ suggestionData }) => {
    return (
      <div className="w-full max-w-screen-xl mx-auto px-6 font-sans">
        <Search suggestionData={suggestionData} />
      </div>
    )
}

export async function getServerSideProps(ctx) {
  const { searchTerm } = ctx.query;
  let suggestionData = null;

  if (searchTerm) {
    const API_URL = process.env.API_URL || '/'

    const data = await fetch(`${API_URL}/subtitles/suggestion/${searchTerm}`)
    suggestionData = await data.json()
  }

  return { props: { suggestionData } }
}

export default Index;
