import React, { useState } from 'react'
import { CloseIcon, DropdownIcon, PlusIcon } from '../assets/svgs'
import CustomInput from './CustomInput'
import './CustomSelect.scss'

const SelectTechnology = ({options, name, inputs, setInputs, children, technology, index, addBtn, ...props}) => {
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState({name: technology?.name ?? '', price: technology?.price ?? ''})

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleSelect = (option) => {
    const newValues = {...values, name: option}
    setValues(newValues)
    setInputs({...inputs, [name]: [...inputs[name].slice(0, index), newValues, ...inputs[name].slice(index + 1)]})
  }

  const handleChange = (e) => {
    const { value } = e.target;
    const newValues = {...values, price: value}
    setValues(newValues)
    setInputs({...inputs, [name]: [...inputs[name].slice(0, index), newValues, ...inputs[name].slice(index + 1)]})
  }

  const handleAdd = () => {
    setInputs({...inputs, [name]: [{name:'', price:''}, ...inputs[name]]})
    setValues({name: '', price: ''})
  }

  const deleteTechnology = () => {
    setInputs({...inputs, [name]: [...inputs[name].slice(0, index), ...inputs[name].slice(index + 1)]})
  }

  return (
    <div className="row technology">
      <div className={`custom-selector ${values.name ? 'selected' : null} ${open ? 'open' : null}`} onClick={handleOpen} onBlur={() => setOpen(false)} tabIndex={0}>
        <label htmlFor={children}>{children}</label>
        <div className="content">{values.name ? `${values.name}`: null}</div>
        <DropdownIcon />
        <div className="options">{options.map(option => (
            <div key={option} className="option" onClick={() => handleSelect(option)}>{option}</div>
          ))}
        </div>
      </div>
      <CustomInput size='72px' type='number' onChange={(e) => handleChange(e)} value={values.price}>Hours</CustomInput>    
      {!addBtn ? (
        <div className='icon-wrapper' onClick={() => deleteTechnology()}>
          <CloseIcon />
        </div>) : (
        <div className='icon-wrapper' onClick={handleAdd}>
          <PlusIcon />
        </div>
      )}
    </div>
  )
}

export default SelectTechnology