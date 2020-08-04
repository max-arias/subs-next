import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const SearchResults = ({ searchKeyword = '', suggestionData = null }) => {
    const router = useRouter()
    const [ suggestions, setSuggestions ] = useState(suggestionData)

    useEffect(() => {
        const fetchSuggestions = async (keyword) => {
            const result = await fetch(`/api/suggestions/${keyword}`)
            const data = await result.json()
            setSuggestions(data)
            router.push(`/${searchKeyword}`)
        }

        if (searchKeyword) {
          fetchSuggestions(searchKeyword)
        } else {
          if (!suggestionData) {
            setSuggestions(null)
          }
        }

        // if (searchKeyword) {
        //   router.push(`/${searchKeyword}`)
        // }
    }, [searchKeyword])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {suggestions && suggestions.length ? suggestions.map((s, index) => {
            const poster = s.Poster === 'N/A' ? 'https://via.placeholder.com/94x128?text=No+Image' : s.Poster;

            return (
              <Link href={`/subs/${s.imdbID}`} key={s.imdbID}>
                <div className="w-full flex mb-4 cursor-pointer lg:h-32">
                  <img className="h-48 lg:h-32 w-auto flex-none bg-cover rounded-tl rounded-bl text-center overflow-hidden" src={poster} alt={s.Title} />
                  <div className="md:w-32 border-r border-b border-gray-400 border-t bg-white rounded rounded-tl-none rounded-bl-none p-4 flex flex-col justify-between leading-normal flex-grow">
                    <div className="text-gray-900 font-bold text-xl mb-2">{s.Year}</div>
                    <p className="text-gray-700 text-base" style={{ lineClamp: 1 }}>{s.Title}</p>
                  </div>
                </div>
              </Link>
            )
          }
          ) : (!!suggestionData || searchKeyword) ? <span>No results</span> : null }
        </div>
    )
}

export default SearchResults;
