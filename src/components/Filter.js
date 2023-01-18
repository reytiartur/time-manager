import React, { useEffect, useState } from 'react'
import { FilterIcon } from '../assets/svgs'
import FilterSelector from './FilterSelector'
import './Filter.scss'
import { useDispatch } from 'react-redux'
import { setFilter } from '../features/filtersSlice'

const Filter = () => {
    const filter = {period: '', plan: ''}
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(filter)
    const dispatch = useDispatch()

    const handleOpen = () => {
        if(Object.values(selected).some(value => !!value)) return;
        setOpen(!open)
    }

    const handleClear = () => {
        setSelected(filter)
    }

    useEffect(() => {
        dispatch(setFilter(selected))
    }, [selected])

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
            <FilterSelector text='period' options={['Grey', 'Yellow', 'Red']} selected={selected} setSelected={setSelected} />
            <FilterSelector text='plan' options={['Standard', 'Pro']} selected={selected} setSelected={setSelected} />
        </div>) : null}
        {open && Object.values(selected).some(value => !!value) ? <button onClick={handleClear}>Clear filters</button> : null}
    </div>
  )
}

export default Filter