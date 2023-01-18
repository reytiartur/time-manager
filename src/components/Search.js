import React from 'react'
import { SearchIcon } from '../assets/svgs'
import './Search.scss'
import { useDispatch } from 'react-redux'
import { setSearch } from '../features/filtersSlice'

const Search = () => {
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(setSearch(value))
  }

  return (
    <div className='search'>
        <SearchIcon />
        <input type="text" placeholder='Search...' onChange={(e) => handleChange(e)} />
        <button>Search</button>
    </div>
  )
}

export default Search