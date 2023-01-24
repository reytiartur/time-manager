import React from 'react'
import { Attention, EditIcon, PlusIcon } from '../assets/svgs'
import CustomButton from './CustomButton'
import CustomTooltip from './CustomTooltip'
import './ProjectEditTimebank.scss'

const ProjectEditTimebank = ({ header, timebank }) => {
    const tooltipInside = <><Attention /><p>Only the current timebank can be edited</p></>

    return (
        <div className='edit-block'>
            <p className="edit-header">{header}:</p>
            <div className="edit-text-container">
                {timebank.slice(0, 3).map(bank => (
                    <div key={bank.name} className="bank-row">
                        <p className="edit-text">{bank.name}:</p>
                        <p className="edit-text">{bank.plan.split(' ')[0]}</p>
                        <div className="ellipse" />
                        <p className="edit-text">{bank.hours} h</p>
                    </div>
                ))}
            </div>
            <div className="icons-wrapper-container">
                <CustomTooltip title={tooltipInside}>
                    <div className="edit-icon-wrapper">
                        <EditIcon />
                    </div>
                </CustomTooltip>
                <div className="edit-icon-wrapper">
                    <PlusIcon />
                </div>
            </div>
            <CustomButton size='minor'>See all</CustomButton>
        </div>
      )
}

export default ProjectEditTimebank