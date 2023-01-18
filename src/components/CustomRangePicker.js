import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "../assets/svgs";
import './CustomRangePicker.scss'

const CustomRangePicker = ({inputs, setInputs, children}) => {
    const [startDate, setStartDate] = useState(inputs.period?.start ?? '');
    const [endDate, setEndDate] = useState(inputs.period?.end ?? '');

    const handleChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        setInputs({...inputs, period: [start, end]})
    };

  return (
    <div className="date-picker-wrapper">
        <DatePicker
            selected={startDate}
            onChange={handleChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            calendarClassName="calendar"
            className="calendar-input"
            dateFormat="dd/MM/yy"
        />
        <label htmlFor={children}>{children}</label>
        <div className="wrapper">
            <CalendarIcon />
        </div>
    </div>
  )
}

export default CustomRangePicker