import React from 'react';
import './AuthPage.scss';
import {Outlet} from 'react-router-dom'
import TimeM from '../assets/TimeM.png'

const authPage = () => {
  return (
    <div className='auth-page'>
        <div className="auth shadow">
          <Outlet></Outlet>
        </div>
        <div className="hero">
          <div className="hero-img" />
          <div className="hero-rect">
            <div className="logo">
              <p>TIME</p>
              <img src={TimeM} alt="Time M logo" />
            </div>
          </div>
          <div className="hero-text">
            <p>App development with a focus on quality</p>
          </div>
        </div>
    </div>
  )
}

export default authPage