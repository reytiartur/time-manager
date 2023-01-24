import React from 'react'
import { useEffect } from 'react'
import { PlusIcon } from '../assets/svgs'
import AssignedIcon from './AssignedIcon'
import CustomButton from './CustomButton'
import CustomTooltip from './CustomTooltip'
import './ProjectFullNavbar.scss'

const ProjectFullNavbar = ({project}) => {

    const handleSelect = (e) => {
        document.querySelectorAll('.active').classList.remove('active');
        e.currentTarget.classList.add('active');
    }

    useEffect(() => {
        document.querySelector('.custom-button__timebank').classList.add('active');
    }, [])

  return (
    <div className='project-nav'>
        <div className="assigned">
            <p>People assigned:</p>
            <div className="assigned-icons">             
                {project?.pricePerHour.map(obj => (
                    <CustomTooltip key={obj.name + obj.price} title={<p>€{obj.price} per hour</p>}>
                        <AssignedIcon name={obj.name} className='assigned-icon' />
                    </CustomTooltip>
                ))}
            </div>
            <div className="icon-wrapper">
                <PlusIcon />
            </div>
        </div>
        <div className="timebanks-buttons">
            {project.timebank.slice(0, 3).map(bank => (
                <CustomButton key={bank.name} size='timebank' onClick={(e) => handleSelect(e)}>{bank.name}</CustomButton>
            ))}
        </div>
    </div>
  )
}

export default ProjectFullNavbar