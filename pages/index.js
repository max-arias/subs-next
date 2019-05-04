'use strict';

import AutocompleteSearch from '../components/AutocompleteSearch'

export default () => (
  <>
    <div className='wrapper'>
      <div></div>
      <div className='content'>
        <AutocompleteSearch />
      </div>
      <div></div>
    </div>

    <style jsx>{`
      .wrapper {
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        grid-gap: 1rem;
      }

      .wrapper .content {
        padding-top: 10rem;
      }
    `}
    </style>
  </>
)
