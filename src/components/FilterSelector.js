import React, { useState } from 'react'
import { DropdownIcon } from '../assets/svgs'
import './FilterSelector.scss'

const Selector = ({text, options, ...props}) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('')

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleSelect = (option) => {
    setSelected(option.toLowerCase())
  }

  return (
    <div className={`selector ${selected ? 'selected' : null} ${open ? 'open' : null}`} onClick={handleOpen} onBlur={() => setOpen(false)} tabIndex={0}>
      <div className="text">{selected ? `${text}: ${selected}`: text}</div>
      <DropdownIcon />
      <div className="options">{options.map(option => (
          <div key={option} className="option" onClick={() => handleSelect(option)}>{option}</div>
        ))}
      </div>
    </div>
  )
}

export default Selector