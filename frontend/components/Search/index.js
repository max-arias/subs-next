import React, {useState} from 'react'
import Link from 'next/link'

import SearchBar from './SearchBar'
import SearchResult from './SearchResults'

import Spinner from '../../assets/svg/spinner.svg';

const Search = ({ suggestionData = null, loading = false }) => {
    const [searchKeyword, setSearchKeyword] = useState(null)

    const searchCallback = (keyword) => {
      setSearchKeyword(keyword)
    }

    return (
        <div className="grid grid-cols-1 mt-20">
            <Link href="/">
              <h1 className="text-3xl md:text-6xl text-center pb-4 cursor-pointer">Subgregator</h1>
            </Link>
            <SearchBar searchCallback={searchCallback} />
            {loading ? (
              <div className="w-full flex justify-center mt-4">
                <Spinner className="animate-spin -ml-1 mr-3 h-10 w-10 text-purple-700" />
              </div>
            ): <SearchResult searchKeyword={searchKeyword} suggestionData={suggestionData} />}

        </div>
    )
}

export default Search;
