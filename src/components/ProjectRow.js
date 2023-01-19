import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { ArchivedIcon, UnarchiveIcon } from '../assets/svgs'
import { handleEdit } from '../features/projectsSlice';
import Popup from './Popup';
import './ProjectRow.scss'

const ProjectRow = ({ project }) => {
  const { projectName, client, period, timebank, hoursSpent, archived } = project;
  const saldo = timebank - hoursSpent;
  const progressStyle = { right: `${100 - ((hoursSpent / timebank) * 100)}%`};
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const start = new Date(period[0]).toLocaleDateString("en-us", { month:'short', day:'numeric' });
  const end = new Date(period[1]).toLocaleDateString("en-us", { month:'short', day:'numeric' })

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

  useEffect(() => {
    const periodColor = saldo > timebank / 2 ? 'grey' : saldo < 40 ? 'red' : saldo < timebank / 2 ? 'yellow' : null;
    const newObj = {...project, periodColor: periodColor}
    dispatch(handleEdit(newObj))
  }, [saldo])

  return (
    <>
      <tr className='project-row'>
        <td className='project-names'>
          <p className="project-name">{projectName}</p>
          <p className="project-client">{client}</p>
        </td>
        <td className='project-period'>
          <div className='date'>
            {`${start} - ${end}`}
            <div style={progressStyle} className={`progress ${saldo <= 40 ? 'danger' : saldo <= (timebank / 2) ? 'warning' : 'grey'}`} />
          </div>
        </td>
        <td className='project-numbers'>{timebank} h</td>
        <td className='project-numbers'>{hoursSpent} h</td>
        <td className={`project-numbers ${saldo <= 40 ? 'danger' : null}`}>{saldo} h</td>
        <td className='project-action'>
          <div onClick={handleOpen}>
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