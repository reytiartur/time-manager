import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import './Application.scss'
import '../components/Header.scss'

const Application = () => {

  return (
    <div className='main-container'>
      <Header />
      <Outlet />
    </div>
  )
}

export default Application