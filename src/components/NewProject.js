import React from 'react'
import './NewProject.scss'
import ProjectDetailsBlock from './ProjectDetailsBlock'
import TimebankDetailsBlock from './TimebankDetailsBlock'
import TechnologiesBlock from './TechnologiesBlock'

const NewProject = ({inputs, setInputs, timebank, setTimebank}) => {

  const handleChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prevState) => ({...prevState, [name]: value}))
  }
  
  return (
    <div className="inputs-container">
        <ProjectDetailsBlock inputs={inputs} setInputs={setInputs} handleChange={(e) => handleChange(e, setInputs)} />
        <TimebankDetailsBlock timebank={timebank} setTimebank={setTimebank} handleChange={(e) => handleChange(e, setTimebank)} />
        <TechnologiesBlock inputs={inputs} setInputs={setInputs} />
    </div>
  )
}

export default NewProject