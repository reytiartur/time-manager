import React from 'react'
import './CustomInput.scss'

const CustomInput = ({type = 'text', size = 'auto', children, icon = null, ...props}) => {
  return (
    <div className='custom-input' style={{width: size}}>
        <label htmlFor={children}>{children}</label>
        <input type={type} name={children} {...props} />
        {icon}
    </div>
  )
}

export default CustomInput