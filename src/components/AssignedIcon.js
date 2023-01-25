import React, { forwardRef } from 'react'
import './AssignedIcon.scss'

const AssignedIcon = forwardRef((props, ref) => {
  const { name } = props;
  
  return (
    <div className='assigned-icon' {...props} ref={ref}>{name.slice(0, 2).toUpperCase()}</div>
  )
})

export default AssignedIcon