import React, { useEffect, useState } from 'react'

const SearchResults = ({ searchKeyword }) => {
    const [ suggestions, setSuggestions ] = useState(null)

    useEffect(() => {
        const fetchSuggestions = async (keyword) => {

        }

        if (searchKeyword) {
            // fetch suggestions
        }
    }, [searchKeyword])
    return (
        <div>
            <div>{searchKeyword}</div>
            <ul>

            </ul>
        </div>
    )
}

export default SearchResults;
