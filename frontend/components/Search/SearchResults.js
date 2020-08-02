import React, { useEffect, useState } from 'react'

const SearchResults = ({ searchKeyword }) => {
    const [ suggestions, setSuggestions ] = useState(null)

    useEffect(() => {
        const fetchSuggestions = async (keyword) => {
            const result = await fetch(`/api/subtitles/suggestion/${keyword}`)
            const data = await result.json()
            setSuggestions(data)
        }

        if (searchKeyword) {
          fetchSuggestions(searchKeyword)
        } else {
          setSuggestions(null)
        }
    }, [searchKeyword])
    return (
        <div>
          {suggestions && suggestions.length? (
            <ul>
              {suggestions.map(s => (<li key={s.imdbID}>{s.Title}</li>))}
            </ul>
          ) : searchKeyword ? <span>No results</span> : null}
        </div>
    )
}

export default SearchResults;
