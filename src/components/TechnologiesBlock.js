import React from 'react'
import SelectTechnology from './SelectTechnology'
import './NewProject.scss'

const TechnologiesBlock = ({inputs, setInputs}) => {
  
  return (
    <div className="details">
        <p className="text">Price per hour</p>
        <div className="rows technologies">
              <SelectTechnology key='input-selector' name='pricePerHour' options={["PM", 'UI/UX', 'Frontend', 'Backend', 'QA']} inputs={inputs} setInputs={setInputs}>Technology</SelectTechnology>
            {inputs?.pricePerHour?.map(technology => (
              <SelectTechnology key={technology.name + technology.price} name='pricePerHour' options={["PM", 'UI/UX', 'Frontend', 'Backend', 'QA']} technology={technology} inputs={inputs} setInputs={setInputs}>Technology</SelectTechnology>
            ))}
        </div>
    </div>
  )
}

export default TechnologiesBlock