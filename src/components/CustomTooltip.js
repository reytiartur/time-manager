import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import './CustomTooltip.scss'
import { Zoom } from '@mui/material';

const CustomTooltip = ({title, children}) => {
  return (
    <Tooltip title={title} placement='top' arrow enterDelay={100} leaveDelay={100} TransitionComponent={Zoom} enterNextDelay={200} disableInteractive>
        {children}
    </Tooltip>
  )
}

export default CustomTooltip