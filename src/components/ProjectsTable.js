import React from 'react'
import ProjectRow from './ProjectRow'
import './ProjectsTable.scss'
import { useSelector } from 'react-redux';
import { SortIcon } from '../assets/svgs';

const ProjectsTable = () => {
  const projects = useSelector((state) => state.projects)
  const searchString = useSelector((state) => state.filters.search)

  return (
    <table className='projects-table'>
      <thead className="table-head">
        <tr>
          <td>Details</td>
          <td>Period</td>
          <td>Timebank <SortIcon /></td>
          <td>Hours spent <SortIcon /></td>
          <td>Saldo <SortIcon /></td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody className='table-body'>
        {projects?.map(project => (
          <ProjectRow key={project.projectNumber} project={project}  />
        ))}
      </tbody>
    </table>
  )
}

export default ProjectsTable