import React from 'react'
import './CustomButton.scss';

const CustomButton = ({size = 'default', children, ...props}) => {


  return (
    <button className={`custom-button custom-button__${size}`} {...props}>{children}</button>
  )
}

export default CustomButton