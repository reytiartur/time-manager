import React from 'react'
import CustomInput from './CustomInput'
import CustomRangePicker from './CustomRangePicker'
import CustomSelect from './CustomSelect'
import './NewProject.scss'

const TimebankDetailsBlock = ({ timebank, setTimebank, handleChange }) => {
  return (
    <div className="details">
        <p className="text">Timebank details</p>
        <div className="rows">
            <div className="row">
            <CustomInput size='250px' name='name' value={timebank.name} onChange={(e) => handleChange(e, setTimebank)}>Timebank name</CustomInput>
            <CustomSelect name='plan' options={['Standard (150 - 499 h)', 'Pro (500 - 1000 h)']} inputs={timebank} setInputs={setTimebank}>Timebank plan</CustomSelect>
            </div>
            <div className="row">
            <CustomInput size='250px' name='hours' value={timebank.hours} onChange={(e) => handleChange(e, setTimebank)}>Timebank hours</CustomInput>
            <CustomRangePicker inputs={timebank} setInputs={setTimebank}>Period</CustomRangePicker>
            </div>
        </div>
    </div>
  )
}

export default TimebankDetailsBlock