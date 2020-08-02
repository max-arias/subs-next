import React, {useState} from 'react'

import SearchBar from './SearchBar'
import SearchResult from './SearchResults'

const Search = () => {
    const [searchKeyword, setSearchKeyword] = useState(null)

    const searchCallback = (keyword) => {
        setSearchKeyword(keyword)
    }

    return (
        <div className="grid grid-cols-1 mt-20">
            <h1 className="text-3xl md:text-6xl text-center pb-4">Subgregator</h1>
            <SearchBar searchCallback={searchCallback} />
            <SearchResult searchKeyword={searchKeyword}/>
        </div>
    )
}

export default Search;
