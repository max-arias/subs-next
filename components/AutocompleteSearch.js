'use strict';

import React, { useState, useEffect } from "react";
import Autocomplete from 'react-autocomplete';
import Router from 'next/router';
import classNames from 'classnames';

import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

import { Avatar, Input, Icon, Typography } from 'antd';
const { Search } = Input;
const { Text } = Typography;

import './AutocompleteSearch.scss';

const _autocompleteCache = {};

const menuStyle = {
  borderRadius: '3px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '2px 0',
  fontSize: '90%',
  position: 'fixed',
  overflow: 'auto',
  maxHeight: '50%',
};

export default () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const searcher = async (value) => {
    setIsSearching(true);

    console.log('Searching for: ', value);

    const cached = _autocompleteCache[value];
    if (cached) {
      setSearchResults(cached);
      return;
    }

    const res = await fetch(`/autocomplete/${value}`);
    const result = await res.json();

    if (result.result) {
      setSearchResults(result.result);
      _autocompleteCache[value] = result.result;
    }

    setIsSearching(false);
  }

  const debouncedSearcher = debounce(searcher, 300);
  const throttledSearcher = throttle(searcher, 300);

  const handleChange = (e, value) => {
    setSearchValue(value);
  }

  const handleSelect = (value, item) => {
    console.log('value', value);
    console.log('item', item);

    Router.push(`/s/${item.imdbID}`);
  }

  useEffect(() => {
    if (searchValue.length > 3) {
      throttledSearcher(searchValue);
    }
  }, [searchValue])

  const buildMenu = (items, value) => {
    if (items.length) {
      return items;
    }

    if (items.length === 0 && searchValue !== '' && searchValue.length > 3 && !isSearching) {
      return (
        <div className='menu-item' style={{ background: 'white' }}>
          No matches for {value}
        </div>
      )
    } else {
      return <div>What are you looking for?</div>
    }

  }

  return (
    <div className="autocomplete-wrapper">
      <Autocomplete
        open={!!searchResults.length}
        value={searchValue}
        items={searchResults}
        getItemValue={item => item.Title}
        onSelect={handleSelect}
        onChange={handleChange}
        inputProps={{
          className: 'ant-input',
          placeholder: 'What are you looking for?',
        }}
        renderInput = { props => (
          <span className="ant-input-search ant-input-affix-wrapper">
            <input {...props} />
            <span className="ant-input-suffix">
              {isSearching ? (
                <Icon type="loading" />
              ): (
                <Icon type="search" />
              )}
            </span>
          </span>
        )}
        renderItem={(item, isHighlighted) =>
          <div className={classNames({ 'highlighted': isHighlighted, 'menu-item': true })} key={item.imdbID}>
            { item.Poster && item.Poster !== 'N/A' ?
              <img src={item.Poster} alt={item.Title} width={50}/>
            :
              <Avatar icon='warning' shape="square" size={64}/>
            }
            <Text className='title'>{item.Title}</Text>
          </div>
        }
        renderMenu={(items, value, style) => {
          return (
            <div className="menu" style={{ ...style, ...menuStyle }}>{buildMenu(items, value)}</div>
          )
        }}
        isItemSelectable={(item) => !item.header}
        wrapperStyle={{
          width: '100%',
          display: 'block',
        }}
      />
    </div>
  )
};
