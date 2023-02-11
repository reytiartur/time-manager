import React, { useContext } from 'react'
import { format, startOfWeek, addDays, endOfMonth, endOfWeek, isSameMonth, isSameDay, startOfMonth, isWithinInterval, parseISO } from "date-fns";
import { CommentIcon, EditIcon, PlusIcon } from '../assets/svgs'
import CustomButton from './CustomButton';
import TaskItem from './TaskItem';
import { DateContext } from '../utils/dateContext';


const Weeks = ({ setSelected, timebank, setOpenAdd, setOpenTasks }) => {
    const { selectedDate, setSelectedDate, activeDate } = useContext(DateContext);
    const weekStartDate = startOfWeek(activeDate, { weekStartsOn: 1 });

    const handleSelect = (date, setOpen, index) => {
        setSelected(index)
        setSelectedDate(date.toDateString())
        setOpen(true)
    }

    const weekDayNames = [];
    for (let day = 0; day < 7; day++) {
        weekDayNames.push(
            <div key={day + Math.random()} className="week-name">{format(addDays(new Date(weekStartDate), day), "E")}</div>
        );
    }

  const generateDatesForCurrentWeek = (date, activeDate) => {
    let currentDate = date;
    const week = [];

    for (let day = 0; day < 7; day++) {
        const thisDate = currentDate;
        const hasDate = timebank.findIndex(item => item.date?.hasOwnProperty(thisDate.toDateString()));
        const items = timebank[hasDate]?.date[thisDate.toDateString()][0]
        const withinInterval = timebank.findIndex(bank => isWithinInterval(new Date(thisDate), { start: new Date(bank.period[0]), end: new Date(bank.period[1])}))
        week.push(
        <div key={thisDate + day} className={`day ${isSameMonth(currentDate, activeDate) ? "" : "inactiveDay"} ${isSameDay(new Date(currentDate), new Date()) ? "today" : ""}`} onClick={withinInterval >=0 && hasDate >= 0 ? () => handleSelect(thisDate, setOpenTasks, withinInterval) : withinInterval >=0 && hasDate < 0 ? () => handleSelect(thisDate, setOpenAdd, withinInterval) : null}>
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
    allWeeks.push(generateDatesForCurrentWeek(currentDate, activeDate));
    currentDate = addDays(currentDate, 7);
  }

  return (
    <>
        <div className="week-names">{weekDayNames}</div>  
        <div className="calendar-grid">{allWeeks}</div>
    </>
  )
}

export default Weeks