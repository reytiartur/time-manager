import React from 'react'
import './CustomTab.scss'

const CustomTab = ({ icon, active, children, ...props }) => {
  return (
    <div className={children === active ? 'tab active' : 'tab'} {...props}>
        {icon}
        <p>{children}</p>
    </div>
  )
}

export default CustomTab