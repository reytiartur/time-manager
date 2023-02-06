import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArchivedIcon, UnarchiveIcon } from '../assets/svgs'
import { handleEdit } from '../features/projectsSlice';
import Popup from './Popup';
import './ProjectRow.scss'

const ProjectRow = ({ project }) => {
  const { projectName, client, timebank, archived } = project;
  const saldo = timebank[0].hours - timebank[0].hoursSpent;
  const progressStyle = 100 - ((timebank[0].hoursSpent / timebank[0].hours) * 100);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const start = new Date(timebank[0].period[0]).toLocaleDateString("en-us", { month:'short', day:'numeric' });
  const end = new Date(timebank[0].period[1]).toLocaleDateString("en-us", { month:'short', day:'numeric' })

  const handleToggle = () => {
    const newObj = {...project, archived: !archived}
    dispatch(handleEdit(newObj))
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClick = (e) => {
    if(!e.target.closest('#archive')) {
      navigate(`/projects/${project.projectNumber}`, { state: {project} })
    }
  }

  useEffect(() => {
    const periodColor = saldo > timebank[0].hours / 2 ? 'grey' : saldo < 40 ? 'red' : saldo < timebank[0].hours / 2 ? 'yellow' : null;
    const newObj = {...project, timebank: [{ ...project.timebank[0], periodColor: periodColor }, ...project.timebank.slice(1)]}
    dispatch(handleEdit(newObj))
  }, [saldo])

  return (
    <>
      <tr className='project-row' onClick={handleClick}>
        <td className='project-names'>
          <p className="project-name">{projectName}</p>
          <p className="project-client">{client}</p>
        </td>
        <td className='project-period'>
          <div className='date'>
            <p className='date-text'>{`${start} - ${end}`}</p>
            <div style={progressStyle < 0 ? {right: '0'} : {right: progressStyle} } className={`progress ${saldo <= 40 ? 'danger' : saldo <= (timebank[0].hours / 2) ? 'warning' : 'grey'}`} />
          </div>
        </td>
        <td className='project-numbers'>{timebank[0].hours} h</td>
        <td className='project-numbers'>{timebank[0].hoursSpent} h</td>
        <td className={`project-numbers ${saldo <= 40 ? 'danger' : null}`}>{saldo} h</td>
        <td className='project-action'>
          <div id='archive' onClick={handleOpen}>
            {archived ? <UnarchiveIcon /> : <ArchivedIcon /> }
          </div>
        </td>
      </tr>

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

export default ProjectRow