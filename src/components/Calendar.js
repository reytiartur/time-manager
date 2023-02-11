import React, { useContext } from 'react'
import './Calendar.scss'
import { format, subMonths, addMonths} from "date-fns";
import { ArrowLeftIcon, ArrowRightIcon, DropdownIcon } from '../assets/svgs'
import { DateContext } from '../utils/dateContext';
import { useState } from 'react';
import Popup from './Popup';
import AddHoursSelector from './AddHoursSelector';
import { useDispatch } from 'react-redux';
import { handleEdit } from '../features/projectsSlice';
import TasksPreview from './TasksPreview';
import { useEffect } from 'react';
import Weeks from './Weeks';

const Calendar = ({ project, selected, setSelected }) => {
  const { timebank } = project;
  const technologies = []
  project.pricePerHour.map(techno => technologies.push(techno.name))
  const { selectedDate, activeDate, setActiveDate } = useContext(DateContext);
  const [openAdd, setOpenAdd] = useState(false)
  const [openTasks, setOpenTasks] = useState(false)
  const [tasks, setTasks] = useState({[selectedDate]: []})
  const dispatch = useDispatch()

  const start = new Date(timebank[selected]?.period[0]).toLocaleDateString("en-us", { month:'short', day:'numeric' });
  const end = new Date(timebank[selected]?.period[1]).toLocaleDateString("en-us", { month:'short', day:'numeric' });

  const parsedDate = selectedDate?.split(' ').splice(1, 2).join(' ')


  useEffect(() => {
    setTasks({[selectedDate]: []})
  }, [selectedDate])

  const handleCreate = () => {
    const key = Object.keys(tasks)
    const values = Object.values(tasks)
    let hours = Object.values(timebank[selected].date).map(item => item[0].reduce((acc, item) => { return acc + Number(item.hour)}, 0)).reduce((acc, item) => { return acc + item}, 0)
    hours += Number(values[0][0].hour)
    const newTimebank = {...project.timebank[selected], date: {...project.timebank[selected].date, [key]: values} , hoursSpent: hours}
    const newObj = {...project, timebank: [...project.timebank.slice(0, selected), newTimebank, ...project.timebank.slice(selected + 1)]}
    dispatch(handleEdit(newObj))
  }

  const handleOpenEdit = () => {
    setTasks({[selectedDate]: [...timebank[selected].date[selectedDate][0]]})
    setOpenAdd(true)
  }


  return (
    <>
      <div className='calendar-container'>
          <div className="calendar-header">
              <div className="calendar-info">
                  <div className="header-block">
                      <p className="header-title">Submitted hours:</p>
                      <p className="header-text">{timebank[selected]?.hoursSpent} / {timebank[selected]?.hours}</p>
                  </div>

                  <div className="ellipse" />

                  <div className="header-block">
                      <p className="header-title">Period:</p>
                      <p className="header-text">{start} - {end}</p>
                  </div>
              </div>
              <div className="calendar-selector">
                  <div className="icon-wrapper" onClick={() => setActiveDate(subMonths(activeDate, 1))}>
                      <ArrowLeftIcon />
                  </div>
                  <div className="icon-wrapper" onClick={() => setActiveDate(addMonths(activeDate, 1))}>
                      <ArrowRightIcon />   
                  </div>
                  <div className="month-selector">
                      <p className="month">{format(activeDate, "MMMM yyyy")}</p>
                      <DropdownIcon />
                  </div>
              </div>
          </div>

          <Weeks setSelected={setSelected} timebank={timebank} setOpenAdd={setOpenAdd} setOpenTasks={setOpenTasks} />
      </div>

      <Popup header='Add hours' handleAction={handleCreate} handleClose={() => setOpenAdd(false)} actions={['Cancel', 'Save']} open={openAdd}>
        <div className="content-text">Select technology and add hours </div>
        <div className="rows technologies">
          <AddHoursSelector key='input-technologies' options={technologies} date={selectedDate} tasks={tasks} setTasks={setTasks} technology={null}>Technology</AddHoursSelector>
          {tasks[selectedDate]?.map((technology, index) => (
            <AddHoursSelector key={technology.selected + technology.hour + technology.comment + index} date={selectedDate} options={technologies} technology={technology} tasks={tasks} setTasks={setTasks}>Technology</AddHoursSelector>
          ))}
        </div>
      </Popup>

      <Popup header='Tracked hours' handleAction={() => handleOpenEdit()} handleClose={() => setOpenTasks(false)} actions={['Close', 'Edit']} open={openTasks}>
        <div className="content-text">Hours tracked for {parsedDate} in {timebank[selected]?.name}</div>
        <TasksPreview timebank={project?.timebank} selectedDate={selectedDate} />
      </Popup>
    </>
  )
}

export default Calendar