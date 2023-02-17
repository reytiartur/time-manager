import React, { Fragment, useEffect, useState } from 'react'
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

const defaultTimebank = {name: '', plan: '', hours: '', period: [], hoursSpent: 0, date: []}

const defaultInputs = {
  projectName: '',
  projectNumber: '',
  client: '',
  managers: [''],
  projectType: '',
  timebank: [],
  archived: false,
  pricePerHour: [],
}

const ProjectsScreen = () => {
  const [open, setOpen] = useState(false)
  const [inputs, setInputs] = useState(defaultInputs)
  const [timebank, setTimebank] = useState(defaultTimebank)
  const dispatch = useDispatch()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    handleDefault()
  }
  
  const handleAdd = () => {
    if(inputs.pricePerHour.length === 0 || timebank.period.length < 2) return;

    dispatch(addProject(inputs))
    handleDefault()
    handleClose()
  }

  const handleDefault = () => {
    setInputs(defaultInputs)
    setTimebank(defaultTimebank)
  }

  useEffect(() => {
    setInputs({...inputs, timebank: [{...timebank}]})
  }, [timebank])

  return (
    <Fragment>
      <div className='actions-container'>
        <Search />
        <Filter />
        <CustomButton size='project' onClick={handleOpen}><AddIcon /> Add project</CustomButton>
      </div>
      <ProjectsTable archived={false} />

      <Popup setOpen={setOpen} handleAction={handleAdd} handleClose={handleClose} open={open} header='Create project' actions={['Cancel', 'Save']} size='big'>
        <NewProject inputs={inputs} setInputs={setInputs} timebank={timebank} setTimebank={setTimebank} />
      </Popup>
    </Fragment>
  )
}

export default ProjectsScreen