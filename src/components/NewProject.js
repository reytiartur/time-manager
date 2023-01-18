import React from 'react'
import CustomInput from './CustomInput'
import CustomSelect from './CustomSelect'
import CustomRangePicker from './CustomRangePicker'
import SelectTechnology from './SelectTechnology'
import './NewProject.scss'

const NewProject = ({inputs, setInputs}) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({...inputs, [name]: value})
  }
  
  return (
    <div className="inputs-container">
        <div className="details">
        <p className="text">Project details</p>
        <div className="rows">              
            <div className="row">
            <CustomInput name='projectName' value={inputs.projectName} onChange={(e) => handleChange(e)}>Project name</CustomInput>
            <CustomInput name='projectNumber' value={inputs.projectNumber} onChange={(e) => handleChange(e)}>Project number</CustomInput>
            </div>
            <div className="row">
            <CustomInput size='250px' name='client' value={inputs.client} onChange={(e) => handleChange(e)}>Client</CustomInput>
            <CustomSelect name='managers' options={['Katlin Kanyuk', 'Sergio Sergirini']} inputs={inputs} setInputs={setInputs}>Managers</CustomSelect>
            </div>
            <div className="row">
            <CustomSelect name='projectType' options={['Full-stack', 'Design', 'Development', 'Consulting', 'Internal']} inputs={inputs} setInputs={setInputs}>Project type</CustomSelect>
            </div>
        </div>
        </div>
        <div className="details">
        <p className="text">Timebank details</p>
        <div className="rows">
            <div className="row">
            <CustomInput size='250px' name='timebankName' value={inputs.timebankName} onChange={(e) => handleChange(e)}>Timebank name</CustomInput>
            <CustomSelect name='timebankPlan' options={['Standard (150 - 499 h)', 'Pro (500 - 1000 h)']} inputs={inputs} setInputs={setInputs}>Timebank plan</CustomSelect>
            </div>
            <div className="row">
            <CustomInput size='250px' name='timebank' value={inputs.timebank} onChange={(e) => handleChange(e)}>Timebank hours</CustomInput>
            <CustomRangePicker inputs={inputs} setInputs={setInputs}>Period</CustomRangePicker>
            </div>
        </div>
        </div>
        <div className="details">
        <p className="text">Price per hour</p>
        <div className="rows">
            <div className="row technology">
            <SelectTechnology key='input-selector' name='pricePerHour' options={["PM", 'UI/UX', 'Frontend', 'Backend', 'QA']} inputs={inputs} setInputs={setInputs}>Technology</SelectTechnology>
            </div>
            {inputs?.pricePerHour?.map(technology => (
            <div className="row technology" key={technology.name + technology.price}>
                <SelectTechnology name='pricePerHour' options={["PM", 'UI/UX', 'Frontend', 'Backend', 'QA']} technology={technology} inputs={inputs} setInputs={setInputs}>Technology</SelectTechnology>
            </div>
            ))}
        </div>
        </div>
    </div>
  )
}

export default NewProject