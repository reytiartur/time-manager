import { format } from 'date-fns';
import React, { forwardRef, useRef } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DropdownIcon } from '../assets/svgs';
import './Calendar.scss'

const CustomSelector = forwardRef(({ activeDate, onClick }, ref) => (
    <div className="month-selector" onClick={onClick} ref={ref}>
        <p className="month">{format(new Date(activeDate), "MMMM yyyy")}</p>
        <DropdownIcon />
    </div>
));

const DateSelect = ({activeDate, setActiveDate}) => {
    const calRef = useRef();

    return (
      <DatePicker
        selected={new Date(activeDate)}
        onChange={(date) => setActiveDate(new Date(date))}
        customInput={<CustomSelector ref={calRef} activeDate={activeDate} />}
        dateFormat="dd/MM/yyyy"
        showMonthYearPicker
      />
    );
  
}

export default DateSelect