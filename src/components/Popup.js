import React from 'react'
import './Popup.scss'
import CustomButton from './CustomButton'
import { CloseIcon } from '../assets/svgs';

const Popup = ({ header, handleAction, handleClose, actions, children, open, size='small', setOpen, ...props}) => {
  const [secondary, primary] = actions;

  const handleSubmit = () => {
    handleAction()
    handleClose()
  }

  return (
    <div className={`popup-background ${open ? 'show' : 'hide'}`}>
      {open && <div className={`popup popup__${size}`}>
        <div className="popup-head">
          <p>{header}</p>
          <div className="icon-container" onClick={handleClose}>
            <CloseIcon />
          </div>
        </div>
        <div className="popup-content">
          {children}
        </div>
        <span className='popup-footer'>
            <CustomButton size='secondary' onClick={handleClose}>{secondary}</CustomButton>
            <CustomButton onClick={handleSubmit}>{primary}</CustomButton>
        </span>
      </div>}
    </div>
  )
}

export default Popup