import React, { useContext } from 'react'
import './Calendar.scss'
import { subMonths, addMonths} from "date-fns";
import { ArrowLeftIcon, ArrowRightIcon } from '../assets/svgs'
import { DateContext } from '../utils/dateContext';
import { useState } from 'react';
import Popup from './Popup';
import AddHoursSelector from './AddHoursSelector';
import { useDispatch } from 'react-redux';
import { handleEdit } from '../features/projectsSlice';
import TasksPreview from './TasksPreview';
import { useEffect } from 'react';
import Weeks from './Weeks';
import DateSelect from './DateSelect';

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
    let [values] = Object.values(tasks)
    if((!values[0]?.selected && values[0]?.hour) || (values[0]?.selected && !values[0]?.hour)) return;

    if(!values[0]?.selected && !values[0]?.hour) {
      values = values.slice(1)
    }

    let hours = Object.values(timebank[selected].date).map(item => item.reduce((acc, item) => { return acc + Number(item.hour)}, 0)).reduce((acc, item) => { return acc + item}, 0)
    hours += Number(values[0]?.hour)
    const newTimebank = {...project.timebank[selected], date: {...project.timebank[selected].date, [key]: values} , hoursSpent: hours}
    const newObj = {...project, timebank: [...project.timebank.slice(0, selected), newTimebank, ...project.timebank.slice(selected + 1)]}
    dispatch(handleEdit(newObj))
    setOpenAdd(false)
  }

  const handleOpenEdit = () => {
    setTasks({[selectedDate]: [...timebank[selected].date[selectedDate]]})
    setOpenAdd(true)
    setOpenTasks(false)
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
                <DateSelect activeDate={activeDate} setActiveDate={setActiveDate} />
              </div>
          </div>

          <Weeks setSelected={setSelected} timebank={timebank} setOpenAdd={setOpenAdd} setOpenTasks={setOpenTasks} />
      </div>

      <Popup header='Tracked hours' handleAction={() => handleOpenEdit()} handleClose={() => setOpenTasks(false)} actions={['Close', 'Edit']} open={openTasks}>
        <div className="content-text">Hours tracked for {parsedDate} in {timebank[selected]?.name}</div>
        <TasksPreview timebank={project?.timebank} selectedDate={selectedDate} />
      </Popup>

      <Popup header='Add hours' handleAction={handleCreate} handleClose={() => setOpenAdd(false)} actions={['Cancel', 'Save']} open={openAdd}>
        <div className="content-text">Select technology and add hours </div>
        <div className="rows technologies">
          <AddHoursSelector key='input-technologies' options={["", ...technologies]} date={selectedDate} addBtn={true} tasks={tasks} setTasks={setTasks} technology={tasks[selectedDate]?.[0] ?? null} index={0}>Technology</AddHoursSelector>
          {tasks[selectedDate]?.slice(1).map((technology, index) => (
            <AddHoursSelector key={technology.selected + technology.hour + technology.comment + index} date={selectedDate} options={technologies} technology={technology} tasks={tasks} setTasks={setTasks} index={index + 1} >Technology</AddHoursSelector>
          ))}
        </div>
      </Popup>
    </>
  )
}

export default Calendar