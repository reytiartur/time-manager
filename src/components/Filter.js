import React, { useState } from 'react'
import { FilterIcon } from '../assets/svgs'
import FilterSelector from './FilterSelector'
import './Filter.scss'

const Filter = () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(!open)
    }

  return (
    <div className="filter-container">
        <div className='clicker' onClick={handleOpen}>
            <div className={`icon-container ${open ? 'active' : null}`}>
                <FilterIcon />
            </div>
            <p className='text'>Filters</p>
        </div>
        {open ? (
        <div className="selectors-container">
            <FilterSelector text='Period' options={['Grey', 'Yellow', 'Red']} />
            <FilterSelector text='Plan' options={['Standard', 'Pro']} />
        </div>) : null}
        <button>Clear filter</button>
    </div>
  )
}

export default Filter