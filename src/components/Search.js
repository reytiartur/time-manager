import React from 'react'
import { SearchIcon } from '../assets/svgs'
import './Search.scss'

const Search = () => {
  return (
    <div className='search'>
        <SearchIcon />
        <input type="text" placeholder='Search...' />
        <button>Search</button>
    </div>
  )
}

export default Search