import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import EmptyArchived from '../components/EmptyArchived'
import Filter from '../components/Filter'
import ProjectsTable from '../components/ProjectsTable'
import Search from '../components/Search'
import './ProjectsScreen.scss'

const Archived = () => {
  const projects = useSelector((state) => state.projects)
  const isArchived = projects.find(project => project.archived === true)

  return (
    <Fragment>
      {!isArchived ? (<EmptyArchived />) : 
        (<>
          <div className='actions-container'>
            <Search />
            <Filter />
          </div>
          <ProjectsTable archived={true} />
        </>)
      }
    </Fragment>
  )
}

export default Archived