import React from 'react'
import './ProjectEditsBlock.scss'

const ProjectEditsBlock = ({ header, text, icon }) => {
    

    return (
    <div className='edit-block'>
        <p className="edit-header">{header}:</p>
        <p className="edit-text">{text}</p>
        <div className="edit-icon-wrapper">{icon}</div>
    </div>
  )
}

export default ProjectEditsBlock