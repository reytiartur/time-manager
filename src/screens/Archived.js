import React, { Fragment } from 'react'
import Filter from '../components/Filter'
import ProjectsTable from '../components/ProjectsTable'
import Search from '../components/Search'
import './ProjectsScreen.scss'

const Archived = () => {

  return (
    <Fragment>
        <div className='actions-container'>
            <Search />
            <Filter />
        </div>
        <ProjectsTable archived={true} />
    </Fragment>
  )
}

export default Archived