import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ArrowBack } from '../assets/svgs'
import { handleEdit } from '../features/projectsSlice'
import CustomButton from './CustomButton'
import Popup from './Popup'
import './ProjectHeader.scss'

const ProjectHeader = ({ project }) => {
    const { archived } = project;
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleToggle = () => {
        const newObj = {...project, archived: !archived}
        dispatch(handleEdit(newObj))
    }

  return (
    <>
        <header className='project-header'>
            <div className="back" onClick={() => navigate(-1)}>
                <ArrowBack />
                <p>MoneyFlow</p>
            </div>
            <CustomButton size='secondary' onClick={handleOpen}>{archived ? 'Unarchive project' : 'Archive project'}</CustomButton>
        </header>

        {!archived ? 
            <Popup header='Archive project' handleAction={handleToggle} handleClose={handleClose} actions={['Cancel', 'Archive']} open={open} setOpen={setOpen} project={project}>
                <p>If you archive this project it will disappear from the “Projects” tab and will be transferred to “Archived”.</p>
            </Popup> : <Popup header='Unarchive project' handleAction={handleToggle} handleClose={handleClose} actions={['Cancel', 'Unarchive']} open={open} setOpen={setOpen} project={project}>
                <p>If you unarchive this project it will disappear from the “Archived” tab and will be returned to “Projects”.</p>
            </Popup>
      }
    </>
  )
}

export default ProjectHeader