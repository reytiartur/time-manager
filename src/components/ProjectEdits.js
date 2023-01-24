import React from 'react'
import { EditIcon, PlusIcon } from '../assets/svgs'
import './ProjectEdits.scss'
import ProjectEditsBlock from './ProjectEditsBlock'
import ProjectEditTimebank from './ProjectEditTimebank'

const ProjectEdits = ({project}) => {
  return (
    <div className='project-edits'>
        <div className="edits-container">
            <ProjectEditsBlock header="Client" text={project?.client} icon={<EditIcon />} />
            <div className="divider" />
            <ProjectEditsBlock header="Project number" text={project?.projectNumber} icon={<EditIcon />} />
        </div>
        <div className="edits-container">
            <ProjectEditsBlock header="Managers" text={project?.managers} icon={<PlusIcon />} />
            <div className="divider" />
            <ProjectEditsBlock header="Project type" text={project?.projectType} icon={<EditIcon />} />
        </div>
        <div className="edits-container">
            <ProjectEditTimebank header="Timebank plans & hours" timebank={project.timebank} />
        </div>
    </div>
  )
}

export default ProjectEdits