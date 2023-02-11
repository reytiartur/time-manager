import React, { useState } from 'react'
import { CloseIcon, DropdownIcon, PlusIcon } from '../assets/svgs'
import CustomInput from './CustomInput'
import './AddHoursSelector.scss'
import CustomButton from './CustomButton'
import './Calendar.scss'

const AddHoursSelector = ({options, date, tasks, setTasks, children, technology, comment, ...props}) => {
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)
  const defaultValues = {selected: technology?.selected ?? '', hour: technology?.hour ?? '', comment: technology?.comment ?? ''}
  const [values, setValues] = useState(defaultValues)
  const style = {marginLeft: '22px', width: '20px', display: 'flex', justifyContent: 'center'}

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleSelect = (option) => {
    setValues((state) => ({...state, selected: option }))
  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues((state) => ({...state, [name]: value }))
  }

  const handleAdd = () => {
    if(!values.selected || !values.hour) return;

    setTasks({[date]: [values, ...tasks[date]]})
    setValues(defaultValues)
  }

  const findTechnology = () => {
    const obj = tasks[date]?.find(tech => tech.name === technology?.name && tech.hour === technology?.hour)
    const index = tasks[date]?.indexOf(obj)
    return index
  }

  const deleteTechnology = () => {
    const index = findTechnology()
    setTasks({[date]: [...tasks[date].slice(0, index), ...tasks[date].slice(index + 1)]})
  }

  const deleteComment = () => {
    const newValues = {...values, comment: ''}
    setValues(newValues)
    handleEdit(newValues)
    setShow(false)
  }

  const handleEdit = (values) => {
    if(!values.selected || !values.hour) return;

    const index = findTechnology()
    setTasks({[date]: [...tasks[date]?.slice(0, index), values, ...tasks[date]?.slice(index + 1)]})
  }

  const handleEditSelect = (option) => {
    handleSelect(option)
    const newTask = {...values, selected: option}
    handleEdit(newTask)
  }


  return (
    <div className="add-hours-row">
      <div className={`custom-selector ${values.selected ? 'selected' : null} ${open ? 'open' : null}`} onClick={handleOpen} onBlur={() => setOpen(false)} tabIndex={0}>
        <label htmlFor={children}>{children}</label>
        <div className="content">{values.selected ? `${values.selected}`: null}</div>
        <DropdownIcon />
        <div className="options">{options.map(option => (
            <div key={option} className="option" onClick={technology ? () => handleEditSelect(option) : () => handleSelect(option)}>{option}</div>
          ))}
        </div>
      </div>
      <CustomInput size='72px' type='number' name='hour' onChange={(e) => handleChange(e)} onBlur={technology ? () => handleEdit(values) : null} value={values.hour}>Hours</CustomInput>    
      {technology ? (
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
                <input type='text' placeholder="Description (optional)" name='comment' value={values.comment} onChange={(e) => handleChange(e)} onBlur={technology ? () => handleEdit(values) : null} />
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