import React from 'react'
import CustomInput from './CustomInput'
import CustomSelect from './CustomSelect'
import './NewProject.scss'

const ProjectDetailsBlock = ({inputs, setInputs, handleChange}) => {
  return (
    <div className="details">
        <p className="text">Project details</p>
        <div className="rows">              
            <div className="row">
            <CustomInput size='250px' name='projectName' value={inputs.projectName} onChange={(e) => handleChange(e, setInputs)}>Project name</CustomInput>
            <CustomInput size='250px' name='projectNumber' value={inputs.projectNumber} onChange={(e) => handleChange(e, setInputs)}>Project number</CustomInput>
            </div>
            <div className="row">
            <CustomInput size='250px' name='client' value={inputs.client} onChange={(e) => handleChange(e, setInputs)}>Client</CustomInput>
            <CustomSelect name='managers' options={['Katlin Kanyuk', 'Sergio Sergirini']} inputs={inputs} setInputs={setInputs}>Managers</CustomSelect>
            </div>
            <div className="row">
            <CustomSelect name='projectType' options={['Full-stack', 'Design', 'Development', 'Consulting', 'Internal']} inputs={inputs} setInputs={setInputs}>Project type</CustomSelect>
            </div>
        </div>
    </div>
  )
}

export default ProjectDetailsBlock