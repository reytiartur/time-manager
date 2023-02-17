import React, { useEffect, useState } from 'react'
import { CloseIcon, DropdownIcon, PlusIcon } from '../assets/svgs'
import CustomInput from './CustomInput'
import './AddHoursSelector.scss'
import CustomButton from './CustomButton'
import './Calendar.scss'

const AddHoursSelector = ({options, date, tasks, setTasks, children, technology, comment, addBtn, index, ...props}) => {
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)
  const defaultValues = {selected: technology?.selected ?? '', hour: technology?.hour ?? '', comment: technology?.comment ?? ''}
  const [values, setValues] = useState(defaultValues)
  const style = {marginLeft: '22px', width: '20px', display: 'flex', justifyContent: 'center'}

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleSelect = (option) => {
    const newValues = {...values, selected: option}
    setValues(newValues)
    setTasks({[date]: [...tasks?.[date]?.slice(0, index), newValues, ...tasks?.[date]?.slice(index + 1)]})
  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    const newValues = {...values, [name]: value}
    setValues(newValues)
    setTasks({[date]: [...tasks?.[date]?.slice(0, index), newValues, ...tasks?.[date]?.slice(index + 1)]})
  }

  const handleAdd = () => {
    if(!values.selected || !values.hour) return;

    setTasks({[date]: [{selected: '', hour: '', comment: ''}, ...tasks[date]]})
    setValues({selected: '', hour: '', comment: ''})
    setShow(false)
  }

  const deleteTechnology = () => {
    setTasks({[date]: [...tasks[date].slice(0, index), ...tasks[date].slice(index + 1)]})
  }

  const deleteComment = () => {
    const newValues = {...values, comment: ''}
    setValues(newValues)
    setTasks({[date]: [...tasks[date]?.slice(0, index), newValues, ...tasks[date]?.slice(index + 1)]})
    setShow(false)
  }

  return (
    <div className="add-hours-row">
      <div className={`custom-selector ${values.selected ? 'selected' : null} ${open ? 'open' : null}`} onClick={handleOpen} onBlur={() => setOpen(false)} tabIndex={0}>
        <label htmlFor={children}>{children}</label>
        <div className="content">{values.selected ? `${values.selected}`: null}</div>
        <DropdownIcon />
        <div className="options">{options.map(option => (
            <div key={option} className="option" onClick={() => handleSelect(option)}>{option}</div>
          ))}
        </div>
      </div>
      <CustomInput size='72px' type='number' name='hour' onChange={(e) => handleChange(e)} value={values.hour}>Hours</CustomInput>    
      {!addBtn ? (
        <div style={style} onClick={() => deleteTechnology()}>
          <CloseIcon />
        </div>) : (
        <div style={style} onClick={handleAdd}>
          <PlusIcon />
        </div>
      )}
      {!show && values.comment === '' ? (
        <div className="comment-btn">
            <CustomButton size='minor' onClick={() => setShow(true)}>Add comment</CustomButton>
        </div>) : (
        <div className="comment-btn">
            <div className='custom-input' style={{width: '337px'}}>
                <input type='text' placeholder="Description (optional)" name='comment' value={values.comment} onChange={(e) => handleChange(e)} />
            </div>
            <div style={style} onClick={() => deleteComment()}>
                <CloseIcon />
            </div>
        </div>
        )}
    </div>
  )
}

export default AddHoursSelector