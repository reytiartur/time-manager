import React, { useState } from 'react'
import { DropdownIcon } from '../assets/svgs'
import './CustomSelect.scss'

const CustomSelect = ({name, options, inputs, setInputs, children, ...props}) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(inputs[name] ?? '')

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleSelect = (option) => {
    setSelected(option)
    setInputs({...inputs, [name]: option})
  }

  return (
    <div className={`custom-selector ${selected ? 'selected' : null} ${open ? 'open' : null}`} onClick={handleOpen} onBlur={() => setOpen(false)} tabIndex={0}>
      <label htmlFor={children}>{children}</label>
      <div className="content">{selected ? `${selected}`: null}</div>
      <DropdownIcon />
      <div className="options">{options.map(option => (
          <div key={option} className="option" onClick={() => handleSelect(option)}>{option}</div>
        ))}
      </div>
    </div>
  )
}

export default CustomSelect