import React from 'react'
import './EmptyArchived.scss'

const EmptyArchived = () => {
  return (
    <div className='archived-empty'>
        <p className="head-archived">There are no archived projects yet!</p>
        <p className="text-archived">Once you archive any project you will be able to find it on this page.</p>
        <div className="table-head-archived" />
        <div className="rows-container">
            <div className="row-archived" />
            <div className="row-archived" />
            <div className="row-archived" />
            <div className="row-archived" />
            <div className="row-archived" />
        </div>
    </div>
  )
}

export default EmptyArchived