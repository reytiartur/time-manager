import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import './CustomTooltip.scss'

const CustomTooltip = ({title, children}) => {
  return (
    <Tooltip title={title} placement='top' arrow enterDelay={100} leaveDelay={100}>
        {children}
    </Tooltip>
  )
}

export default CustomTooltip