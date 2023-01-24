import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ProjectEdits from '../components/ProjectEdits'
import ProjectFullNavbar from '../components/ProjectFullNavbar'
import ProjectHeader from '../components/ProjectHeader'

const ProjectFullScreen = () => {
    const { state } = useLocation()
    const projects = useSelector((state) => state.projects)
    const project = projects.find(item => item.projectNumber === state.project.projectNumber)

  return (
    <div>
        <ProjectHeader project={project} />
        <ProjectEdits project={project} />
        <ProjectFullNavbar project={project} />

    </div>
  )
}

export default ProjectFullScreen