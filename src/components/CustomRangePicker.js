import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "../assets/svgs";
import './CustomRangePicker.scss'
import enGB from "date-fns/esm/locale/en-GB/index.js";

const CustomRangePicker = ({inputs, setInputs, children}) => {
    const [startDate, setStartDate] = useState(inputs.period[0] ? new Date(inputs.period[0]) : null);
    const [endDate, setEndDate] = useState(inputs.period[1] ? new Date(inputs.period[1]) : null);

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
            locale={enGB}
        />
        <label htmlFor={children}>{children}</label>
        <div className="wrapper">
            <CalendarIcon />
        </div>
    </div>
  )
}

export default CustomRangePicker