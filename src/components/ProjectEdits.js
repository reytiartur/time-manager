import React, { useState } from 'react'
import { EditIcon, PlusIcon } from '../assets/svgs'
import Popup from './Popup'
import './ProjectEdits.scss'
import ProjectDetailsBlock from './ProjectDetailsBlock'
import ProjectEditTimebank from './ProjectEditTimebank'
import ProjectEditsBlock from './ProjectEditsBlock'
import { useDispatch } from 'react-redux'

const ProjectEdits = ({project}) => {
  const [open, setOpen] = useState(false)
  const [inputs, setInputs] = useState({...project})
  const dispatch = useDispatch()

  const handleEdit = () => {
    const newObj = {...inputs}
    dispatch(handleEdit(newObj))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs({...inputs, [name]: value})
  }

  return (
    <>
      <div className='project-edits'>
          <div className="edits-container">
              <ProjectEditsBlock header="Client" text={project?.client} icon={<EditIcon />} handleAction={() => setOpen(true)} />
              <div className="divider" />
              <ProjectEditsBlock header="Project number" text={project?.projectNumber} icon={<EditIcon />} handleAction={() => setOpen(true)} />
          </div>
          <div className="edits-container">
              <ProjectEditsBlock header="Managers" text={project?.managers} icon={<PlusIcon />} handleAction={() => setOpen(true)} />
              <div className="divider" />
              <ProjectEditsBlock header="Project type" text={project?.projectType} icon={<EditIcon />} handleAction={() => setOpen(true)} />
          </div>
          <div className="edits-container">
              <ProjectEditTimebank header="Timebank plans & hours" timebank={project.timebank} project={project} />
          </div>
      </div>

      <Popup header='Edit details' handleAction={handleEdit} handleClose={() => setOpen(false)} actions={['Cancel', 'Save changes']} open={open} size='big'>
        <ProjectDetailsBlock inputs={inputs} setInputs={setInputs} handleChange={handleChange} />
      </Popup>
    </>
  )
}

export default ProjectEdits