import React from 'react'
import { AddIcon } from '../assets/svgs'
import CustomButton from '../components/CustomButton'
import Filter from '../components/Filter'
import Search from '../components/Search'
import './ProjectsScreen.scss'

const ProjectsScreen = () => {
  const handleAdd = () => {

  }

  return (
    <div className='actions-container'>
      <Search />
      <Filter />
      <CustomButton size='project' onClick={handleAdd}><AddIcon /> Add project</CustomButton>
    </div>
  )
}

export default ProjectsScreen