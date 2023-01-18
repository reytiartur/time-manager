import React, { useState } from 'react'
import { DropdownIcon } from '../assets/svgs'
import './FilterSelector.scss'

const Selector = ({text, options, selected, setSelected, ...props}) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleSelect = (option) => {
    setSelected({...selected, [text]: option.toLowerCase()})
  }

  return (
    <div className={`filter-selector ${selected[text] ? 'selected' : null} ${open ? 'open' : null}`} onClick={handleOpen} onBlur={() => setOpen(false)} tabIndex={0}>
      <div className="text">{selected[text] ? `${text}: ${selected[text]}`: text}</div>
      <DropdownIcon />
      <div className="options">{options.map(option => (
          <div key={option} className="option" onClick={() => handleSelect(option)}>{option}</div>
        ))}
      </div>
    </div>
  )
}

export default Selector