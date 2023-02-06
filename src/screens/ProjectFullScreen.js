import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Calendar from '../components/Calendar'
import ProjectEdits from '../components/ProjectEdits'
import ProjectFullNavbar from '../components/ProjectFullNavbar'
import ProjectHeader from '../components/ProjectHeader'
import './ProjectFullScreen.scss'

const ProjectFullScreen = () => {
    const { state } = useLocation()
    const projects = useSelector((state) => state.projects)
    const project = projects.find(item => item.projectNumber === state.project.projectNumber)
    const [selected, setSelected] = useState(0)

  return (
    <div className='full-screen-container'>
      <ProjectHeader project={project} />
      <ProjectEdits project={project} />
      <ProjectFullNavbar project={project} selected={selected} setSelected={setSelected} />
      <Calendar project={project} selected={selected} setSelected={setSelected} />
    </div>
  )
}

export default ProjectFullScreen