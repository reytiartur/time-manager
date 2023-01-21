import React, { Fragment, useState } from 'react'
import { AddIcon } from '../assets/svgs'
import CustomButton from '../components/CustomButton'
import Filter from '../components/Filter'
import Search from '../components/Search'
import './ProjectsScreen.scss'
import ProjectsTable from '../components/ProjectsTable'
import Popup from '../components/Popup'
import { useDispatch } from 'react-redux'
import { addProject } from '../features/projectsSlice'
import NewProject from '../components/NewProject'

const defaultInputs = {
  projectName: '',
  projectNumber: '',
  client: '',
  managers: [''],
  projectType: '',
  timebankName: '',
  timebankPlan: '',
  timebank: '',
  period: '',
  hoursSpent: 0,
  archived: false,
  pricePerHour: [],
}

const ProjectsScreen = () => {
  const [open, setOpen] = useState(false)
  const [inputs, setInputs] = useState(defaultInputs)
  const dispatch = useDispatch()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    handleDefault()
  }
  
  const handleAdd = () => {
    dispatch(addProject(inputs))
    handleDefault()
  }

  const handleDefault = () => {
    setInputs(defaultInputs)
  }

  return (
    <Fragment>
      <div className='actions-container'>
        <Search />
        <Filter />
        <CustomButton size='project' onClick={handleOpen}><AddIcon /> Add project</CustomButton>
      </div>
      <ProjectsTable archived={false} />

      <Popup setOpen={setOpen} handleAction={handleAdd} handleClose={handleClose} open={open} header='Create project' actions={['Cancel', 'Save']} size='big'>
        <NewProject inputs={inputs} setInputs={setInputs} />
      </Popup>
    </Fragment>
  )
}

export default ProjectsScreen