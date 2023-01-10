import React, { useEffect, useState } from 'react'
import TimeM from '../assets/TimeM.png'
import { useSelector } from 'react-redux';
import CustomTab from '../components/CustomTab';
import { ProjectsIcon, ArchivedIcon, ProfileIcon } from '../assets/svgs';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const user = useSelector((state) => state.user)
    const [active, setActive] = useState('projects')
    const navigate = useNavigate()

    const handleClick = (e) => {
        const value = e.target.innerText.toLowerCase()
        setActive(value)
    }

    useEffect(() => {
        navigate(`/${active}`)
    }, [active])

    return (
        <header className='header'>
            <div className="logo">
            <p>TIME</p>
            <img src={TimeM} alt="Time M logo" />
            </div>

            <div className="nav">
            <div className="tabs">
                <CustomTab icon={<ProjectsIcon />} active={active} onClick={(e) => handleClick(e)}>projects</CustomTab>
                <CustomTab icon={<ArchivedIcon />} active={active} onClick={(e) => handleClick(e)}>archived</CustomTab>
            </div>

            <div className="profile">
                <p className="user-name">{user?.userName}</p>
                <div className="icon-bg">
                <ProfileIcon />
                </div>
            </div>
            </div>
        </header>
    )
}

export default Header