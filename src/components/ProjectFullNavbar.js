import { parseISO } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { PlusIcon } from '../assets/svgs'
import { handleEdit } from '../features/projectsSlice'
import { DateContext } from '../utils/dateContext'
import AssignedIcon from './AssignedIcon'
import CustomButton from './CustomButton'
import CustomTooltip from './CustomTooltip'
import Popup from './Popup'
import './ProjectFullNavbar.scss'
import TechnologiesBlock from './TechnologiesBlock'

const ProjectFullNavbar = ({project, selected, setSelected}) => {
    const [open, setOpen] = useState(false)
    const [inputs, setInputs] = useState({...project})
    const dispatch = useDispatch()
    const { setSelectedDate, setActiveDate } = useContext(DateContext);

    const handleSelect = (name) => {
        const newSelected = project.timebank.findIndex(bank => bank.name === name)
        setSelected(newSelected)
        setActiveDate(parseISO(project?.timebank[newSelected]?.period[0]))
    }

    const handleAction = () => {
        dispatch(handleEdit(inputs))
        setOpen(false)
    }

    useEffect(() => {
        setInputs({...project})
    }, [project])

  return (
    <>
        <div className='project-nav'>
            <div className="assigned">
                <p>People assigned:</p>
                <div className="assigned-icons">             
                    {project.pricePerHour.map(obj => (
                        <CustomTooltip key={obj.name + obj.price} title={<p>€{obj.price} per hour</p>}>
                            <AssignedIcon name={obj.name} className='assigned-icon' />
                        </CustomTooltip>
                    ))}
                </div>
                <div className="icon-wrapper" onClick={() => setOpen(true)}>
                    <PlusIcon />
                </div>
            </div>
            <div className="timebanks-buttons">
                {project.timebank.slice(0, 3).map((bank, i) => (
                    <CustomButton key={bank.name} size='timebank' onClick={() => handleSelect(bank.name)} className={i === selected ? "custom-button custom-button__timebank active" : "custom-button custom-button__timebank"}>{bank.name}</CustomButton>
                ))}
            </div>
        </div>

        <Popup header='Add employee' handleAction={handleAction} handleClose={() => setOpen(false)} actions={['Cancel', 'Save']} open={open} size='small'>
            <TechnologiesBlock inputs={inputs} setInputs={setInputs} />
        </Popup>
    </>
  )
}

export default ProjectFullNavbar