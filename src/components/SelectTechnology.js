import React, { useState } from 'react'
import { CloseIcon, DropdownIcon, PlusIcon } from '../assets/svgs'
import CustomInput from './CustomInput'
import './CustomSelect.scss'

const SelectTechnology = ({options, name, inputs, setInputs, children, technology, ...props}) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(technology?.name ?? '')
  const [price, setPrice] = useState(technology?.price ?? '')

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleSelect = (option) => {
    setSelected(option)
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setPrice(value)
  }

  const handleAdd = () => {
    setInputs({...inputs, [name]: [{name:selected, price:price}, ...inputs[name]]})
    setSelected('')
    setPrice('')
  }

  const deleteTechnology = (technology) => {
    const obj = inputs[name].find(tech => tech.name === technology.name && tech.price === technology.price)
    const index = inputs[name].indexOf(obj)
    setInputs({...inputs, [name]: [...inputs[name].slice(0, index), ...inputs[name].slice(index + 1)]})
  }

  return (
    <div className="row technology">
      <div className={`custom-selector ${selected ? 'selected' : null} ${open ? 'open' : null}`} onClick={handleOpen} onBlur={() => setOpen(false)} tabIndex={0}>
        <label htmlFor={children}>{children}</label>
        <div className="content">{selected ? `${selected}`: null}</div>
        <DropdownIcon />
        <div className="options">{options.map(option => (
            <div key={option} className="option" onClick={() => handleSelect(option)}>{option}</div>
          ))}
        </div>
      </div>
      <CustomInput size='72px' type='number' onChange={(e) => handleChange(e)} value={price}>Hours</CustomInput>    
      {technology ? (
        <div style={{width: '20px', display: 'flex', justifyContent: 'center'}} onClick={() => deleteTechnology(technology)}>
          <CloseIcon />
        </div>) : (
        <div style={{width: '20px', display: 'flex', justifyContent: 'center'}} onClick={handleAdd}>
          <PlusIcon />
        </div>
      )}
    </div>
  )
}

export default SelectTechnology