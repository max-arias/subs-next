import _ from 'lodash'
import React, { useCallback, useState } from 'react'

const SearchBar = ({ searchCallback }) => {
    const [inputValue, setInputValue] = useState('')
    const debouncedSearchCallback = useCallback(_.debounce(searchCallback, 250), []);

    const handleInput = (e) => {
        setInputValue(e.target.value)
        debouncedSearchCallback(e.target.value)
    }

    return (
        <div className="flex border border-gray-200 rounded p-4 shadow text-xl">
            <input type="text" className="w-full outline-none px-3" placeholder="Find your Show" onChange={handleInput} value={inputValue} />
        </div>
    )
}

export default SearchBar;
