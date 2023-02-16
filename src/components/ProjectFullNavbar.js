import { parseISO } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { PlusIcon } from '../assets/svgs'
import { handleEdit } from '../features/projectsSlice'
import { DateContext } from '../utils/dateContext'
import AssignedIcon from './AssignedIcon'
import CustomCarousel from './CustomCarousel'
import CustomTooltip from './CustomTooltip'
import Popup from './Popup'
import './ProjectFullNavbar.scss'
import TechnologiesBlock from './TechnologiesBlock'

const ProjectFullNavbar = ({project, selected, setSelected}) => {
    const [open, setOpen] = useState(false)
    const [inputs, setInputs] = useState({...project})
    const dispatch = useDispatch()
    const { setActiveDate } = useContext(DateContext);

    const handleSelect = (name) => {
        const newSelected = project.timebank.findIndex(bank => bank.name === name)
        setSelected(newSelected)
        setActiveDate(new Date(project?.timebank[newSelected]?.period[0]))
    }

    const handleAction = () => {
        if((!inputs?.pricePerHour?.[0]?.name && inputs?.pricePerHour?.[0]?.price) || (inputs?.pricePerHour?.[0]?.name && !inputs?.pricePerHour?.[0]?.price)) return;

        if(!inputs?.pricePerHour?.[0]?.name && !inputs?.pricePerHour?.[0]?.price) {
            const newValues = {...inputs, pricePerHour: [...inputs.pricePerHour.slice(1)]}
            setInputs(newValues)
            dispatch(handleEdit(newValues))
            setOpen(false)
            return;
        }

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
            <CustomCarousel data={project.timebank} selected={selected} handleClick={handleSelect} />
        </div>

        <Popup header='Add employee' handleAction={handleAction} handleClose={() => setOpen(false)} actions={['Cancel', 'Save']} open={open} size='small'>
            <TechnologiesBlock inputs={inputs} setInputs={setInputs} />
        </Popup>
    </>
  )
}

export default ProjectFullNavbar