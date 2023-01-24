import React, { forwardRef } from 'react'
import './AssignedIcon.scss'

const AssignedIcon = forwardRef((props, ref) => {
  const { name } = props;
  
  return (
    <div className='assigned-icon' {...props} ref={ref}>{name}</div>
  )
})

export default AssignedIcon