import React, { useEffect, useState } from 'react'
import ProjectRow from './ProjectRow'
import './ProjectsTable.scss'
import { useSelector } from 'react-redux';
import { SortIcon } from '../assets/svgs';

const ProjectsTable = ({archived}) => {
  const projects = useSelector((state) => state.projects)
  const searchString = useSelector((state) => state.filters.search)
  const filtersString = useSelector((state) => state.filters.filter)
  const defaultProjects = projects.filter(project => project.archived === archived)
  const [renderProjects, setRenderProjects] = useState(defaultProjects)
  const [click, setClick] = useState(false)

  const handleSort = (property) => {
    const sorted = defaultProjects.sort((a,b) => (a[property] >= b[property]) ? 1 : ((b[property] >= a[property]) ? -1 : 0))
    if(!click) {
      setRenderProjects(sorted)
    } else {
      setRenderProjects(sorted.reverse())
    }
    setClick(!click)
  }

  useEffect(() => {
    if(!filtersString?.period && !filtersString?.plan) {
      setRenderProjects(defaultProjects)
    } else {
      const filteredProjects = defaultProjects.filter(project => project?.timebank[0]?.plan?.toLowerCase().includes(filtersString?.plan?.toLowerCase()) && project?.timebank[0]?.periodColor?.toLowerCase().includes(filtersString?.period?.toLowerCase()))
      setRenderProjects(filteredProjects)
    }
  }, [filtersString])

  useEffect(() => {
    setRenderProjects(defaultProjects)
  }, [projects])

  return (
    <table className='projects-table'>
      <thead className="table-head">
        <tr>
          <td onClick={() => setRenderProjects(defaultProjects)} className='sort'>Details</td>
          <td>Period</td>
          <td onClick={() => handleSort('timebank[0].hours')} className='sort'>Timebank <SortIcon /></td>
          <td onClick={() => handleSort('timebank[0].hoursSpent')} className='sort'>Hours spent <SortIcon /></td>
          <td onClick={() => handleSort('timebank[0].hours - timebank[0].hoursSpent')} className='sort'>Saldo <SortIcon /></td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody className='table-body'>
        {searchString ? renderProjects.filter(project => project.projectName.toLowerCase().includes(searchString.toLowerCase()) || project.client.toLowerCase().includes(searchString.toLowerCase())).map(project => (
          <ProjectRow key={project.projectNumber} project={project}  />
        ))
          :
          renderProjects.map(project => (
            <ProjectRow key={project.projectNumber} project={project}  />
          )
        )}
      </tbody>
    </table>
  )
}

export default ProjectsTable