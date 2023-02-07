import React, { useContext } from 'react'
import './Calendar.scss'
import { format, startOfWeek, addDays, endOfMonth, endOfWeek, isSameMonth, isSameDay, startOfMonth, subMonths, addMonths, isWithinInterval, parse, parseISO } from "date-fns";
import { ArrowLeftIcon, ArrowRightIcon, CommentIcon, DropdownIcon, EditIcon, PlusIcon } from '../assets/svgs'
import { DateContext } from '../utils/dateContext';
import { useState } from 'react';
import Popup from './Popup';
import CustomButton from './CustomButton';
import TaskItem from './TaskItem';
import AddHoursSelector from './AddHoursSelector';
import { useDispatch } from 'react-redux';
import { handleEdit } from '../features/projectsSlice';
import TasksPreview from './TasksPreview';
import { useEffect } from 'react';

const Calendar = ({ project, selected, setSelected }) => {
  const { timebank } = project;
  const technologies = []
  project.pricePerHour.map(techno => technologies.push(techno.name))
  const { selectedDate, setSelectedDate, activeDate, setActiveDate } = useContext(DateContext);
  const [openAdd, setOpenAdd] = useState(false)
  const [openTasks, setOpenTasks] = useState(false)
  const [tasks, setTasks] = useState({[selectedDate]: []})
  const dispatch = useDispatch()

  const start = new Date(timebank[selected].period[0]).toLocaleDateString("en-us", { month:'short', day:'numeric' });
  const end = new Date(timebank[selected].period[1]).toLocaleDateString("en-us", { month:'short', day:'numeric' });

  const parsedDate = selectedDate?.split(' ').splice(1, 2).join(' ')

  const handleSelect = (date, setOpen, index) => {
    setSelected(index)
    setSelectedDate(date.toDateString())
    setOpen(true)
  }

  useEffect(() => {
    setTasks({[selectedDate]: []})
  }, [selectedDate])

  const handleCreate = () => {
    const key = Object.keys(tasks)
    const values = Object.values(tasks)
    console.log(values)
    const hours = Object.values(timebank[selected].date).map(item => item[0].reduce((acc, item) => { return acc + Number(item.hour)}, 0)).reduce((acc, item) => { return acc + item}, 0)
    const newTimebank = {...project.timebank[selected], date: {...project.timebank[selected].date, [key]: values} , hoursSpent: hours}
    const newObj = {...project, timebank: [...project.timebank.slice(0, selected), newTimebank, ...project.timebank.slice(selected + 1)]}
    dispatch(handleEdit(newObj))
  }

  const handleOpenEdit = () => {
    setTasks({[selectedDate]: [...timebank[selected].date[selectedDate][0]]})
    setOpenAdd(true)
  }

  const weekStartDate = startOfWeek(activeDate, { weekStartsOn: 1 });
  const weekDayNames = [];
  for (let day = 0; day < 7; day++) {
    weekDayNames.push(
      <div key={day + Math.random()} className="week-name">{format(addDays(weekStartDate, day), "E")}</div>
    );
  }

  const generateDatesForCurrentWeek = (date, selectedDate, activeDate) => {
    let currentDate = date;
    const week = [];
    for (let day = 0; day < 7; day++) {
      const thisDate = currentDate;
      const hasDate = project.timebank.findIndex(item => item.date?.hasOwnProperty(thisDate.toDateString()));
      const items = project.timebank[hasDate]?.date[thisDate.toDateString()][0]
      const withinInterval = timebank.findIndex(bank => isWithinInterval(new Date(thisDate), { start: new Date(bank.period[0]), end: new Date(bank.period[1])}))
      week.push(
        <div key={thisDate + day} className={`day ${isSameMonth(currentDate, activeDate) ? "" : "inactiveDay"} ${isSameDay(currentDate, new Date()) ? "today" : ""}`} onClick={withinInterval >=0 && hasDate >= 0 ? () => handleSelect(thisDate, setOpenTasks, withinInterval) : withinInterval >=0 && hasDate < 0 ? () => handleSelect(thisDate, setOpenAdd, withinInterval) : null}>
          <div className="date">
            {format(thisDate, "d")}
          </div>
          <div className="day-content">
            {hasDate < 0 && withinInterval >= 0 ? <div className="icon-wrapper">
              <p>Add hours</p>
              <PlusIcon />
            </div> : null}
            {withinInterval < 0 ? <div className="icon-wrapper">
              <p>There is no timebank</p>
            </div> : null}
            <div className="tasks-container">
              {hasDate >= 0 ? items?.slice(0, 2).map(item => (
                <TaskItem key={item.selected + item.hour + Math.random()} name={item.selected} hour={item.hour} />
              )) : null}
            </div>
            <div className="buttons-container">
              {items?.length > 2 && (<CustomButton size='minor__light' style={{marginRight: 'auto'}}>More</CustomButton>)}
              {hasDate >= 0 ? <EditIcon /> : null}
              {items?.some(item => item.comment) ? <CommentIcon /> : null}
            </div>
          </div>
        </div>
      );
      currentDate = addDays(currentDate, 1);
    }
    return <div key={'week' + Math.random()} className="week">{week}</div>;
  };

  const startOfTheSelectedMonth = startOfMonth(activeDate);
  const endOfTheSelectedMonth = endOfMonth(activeDate);
  const startDate = startOfWeek(startOfTheSelectedMonth, { weekStartsOn: 1 });
  const endDate = endOfWeek(endOfTheSelectedMonth, { weekStartsOn: 1 });

  let currentDate = startDate;

  const allWeeks = [];

  while (currentDate <= endDate) {
    allWeeks.push(
      generateDatesForCurrentWeek(currentDate, selectedDate, activeDate)
    );
    currentDate = addDays(currentDate, 7);
  }

  return (
    <>
      <div className='calendar-container'>
          <div className="calendar-header">
              <div className="calendar-info">
                  <div className="header-block">
                      <p className="header-title">Submitted hours:</p>
                      <p className="header-text">{timebank[selected].hoursSpent} / {timebank[selected].hours}</p>
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

          <div className="week-names">{weekDayNames}</div>
          
          <div className="calendar-grid">{allWeeks}</div>
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
        <div className="content-text">Hours tracked for {parsedDate} in {timebank[selected].name}</div>
        <TasksPreview timebank={project.timebank} selectedDate={selectedDate} />
      </Popup>
    </>
  )
}

export default Calendar