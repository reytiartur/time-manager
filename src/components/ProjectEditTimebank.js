import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AttentionIcon, DeleteIcon, EditIcon, PlusIcon } from '../assets/svgs'
import { handleEdit } from '../features/projectsSlice'
import CustomButton from './CustomButton'
import CustomTooltip from './CustomTooltip'
import Popup from './Popup'
import './ProjectEditTimebank.scss'
import TimebankDetailsBlock from './TimebankDetailsBlock'

const defaultInputs = {
    name: "",
    plan: "",
    hours: "",
    period: ['', ''],
    hoursSpent: 0,
    periodColor: "grey",
    date: []
}

const ProjectEditTimebank = ({ header, timebank, project }) => {
    const [open, setOpen] = useState(false)
    const [openSecond, setOpenSecond] = useState(false)
    const [openThird, setOpenThird] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [deleteIndex, setDeleteIndex] = useState(null)
    const tooltipInside = <><AttentionIcon /><p>Only the current timebank can be edited</p></>
    const dispatch = useDispatch()
    
    const [inputs, setInputs] = useState(defaultInputs)
    const [bank, setBank] = useState({...timebank[0]})
    

    useEffect(() => {
        setBank({...timebank[0]})
    }, [timebank])

    const handleOpenDelete = (i) => {
        setDeleteIndex(i)
        setOpenDelete(true)
    }

    const handleDelete = (index) => {
        const newObj = {...project, timebank: [...timebank.slice(0, index), ...timebank.slice(index + 1)]}
        dispatch(handleEdit(newObj))
        setOpenDelete(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({...inputs, [name]: value})
    }

    const handleNew = () => {
        const newObj = {...project, timebank: [{...inputs}, ...timebank]}
        dispatch(handleEdit(newObj))
        setInputs(defaultInputs)
        setOpenSecond(false)
    }

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setBank({...bank, [name]: value})
    }

    const handleEditCurrent = () => {
        const newObj = {...project, timebank: [{...bank}, ...timebank.slice(1)]}
        dispatch(handleEdit(newObj))
        setOpenThird(false)
        setInputs(defaultInputs)
    }

    return (
        <>
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
                        <div className="edit-icon-wrapper" onClick={() => setOpenThird(true)}>
                            <EditIcon />
                        </div>
                    </CustomTooltip>
                    <div className="edit-icon-wrapper" onClick={() => setOpenSecond(true)}>
                        <PlusIcon />
                    </div>
                </div>
                <CustomButton size='minor' onClick={() => setOpen(true)}>See all</CustomButton>
            </div>

            <Popup header={header} handleAction={() => setOpen(false)} handleClose={() => setOpen(false)} actions={['', 'Okay']} open={open} size='small'>
                {timebank.map((bank, i) => (
                    <div key={bank.name + i} className="see-all-timebanks">
                        <div key={bank.name} className="bank-row">
                            <p className="edit-text">{bank.name}:</p>
                            <p className="edit-text">{bank.plan.split(' ')[0]}</p>
                            <div className="ellipse" />
                            <p className="edit-text">{bank.hours} h</p>
                            {i === 0 ? <p className='current'>(Current)</p> : null}
                        </div>
                        <div className="icons-wrapper-container">
                            {i === 0 ? <div className="icon-wrapper" onClick={() => setOpenThird(true)}>
                                <EditIcon />
                            </div> : 
                            <div className="icon-wrapper" onClick={() => handleOpenDelete(i)}>
                                <DeleteIcon />
                            </div>}
                        </div>
                    </div>
                ))}
            </Popup>

            <Popup header="Create timebank" handleAction={handleNew} handleClose={() => setOpenSecond(false)} actions={['Cancel', 'Save']} open={openSecond} size='big'>
                <TimebankDetailsBlock timebank={inputs} setTimebank={setInputs} handleChange={handleChange}  />
            </Popup>

            <Popup header="Edit timebank" handleAction={handleEditCurrent} handleClose={() => setOpenThird(false)} actions={['Cancel', 'Save changes']} open={openThird} size='big'>
                <TimebankDetailsBlock timebank={bank} setTimebank={setBank} handleChange={handleEditChange}  />
            </Popup>

            <Popup header="Delete timebank" handleAction={() => handleDelete(deleteIndex)} handleClose={() => setOpenDelete(false)} actions={['Cancel', 'Delete']} open={openDelete}>
                <p>{`Are you sure you want to delete ${timebank[deleteIndex]?.name} timebank?`}</p>
            </Popup>
        </>
      )
}

export default ProjectEditTimebank