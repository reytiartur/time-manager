import React from 'react'
import './ProjectEditsBlock.scss'

const ProjectEditsBlock = ({ header, text, icon, handleAction }) => {

  return (
    <div className='edit-block'>
        <p className="edit-header">{header}:</p>
        <p className="edit-text">{text}</p>
        <div className="edit-icon-wrapper" onClick={handleAction}>{icon}</div>
    </div>
  )
}

export default ProjectEditsBlock