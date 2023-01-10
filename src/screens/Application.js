import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import './Application.scss'


const Application = () => {

  return (
    <div className='main-container'>
      <Header />
      <Outlet />
    </div>
  )
}

export default Application