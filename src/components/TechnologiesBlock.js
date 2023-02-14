import React from 'react'
import SelectTechnology from './SelectTechnology'
import './NewProject.scss'

const TechnologiesBlock = ({inputs, setInputs}) => {
  
  return (
    <div className="details">
        <p className="text">Price per hour</p>
        <div className="rows technologies">
              <SelectTechnology key='input-selector' name='pricePerHour' options={['', "PM", 'UI/UX', 'Frontend', 'Backend', 'QA']} technology={inputs?.pricePerHour[0] ?? null} inputs={inputs} setInputs={setInputs} index={0} addBtn={true}>Technology</SelectTechnology>
            {inputs?.pricePerHour?.slice(1).map((technology, index) => (
              <SelectTechnology key={technology.name + technology.price} name='pricePerHour' options={["PM", 'UI/UX', 'Frontend', 'Backend', 'QA']} technology={technology} inputs={inputs} setInputs={setInputs} index={index + 1}>Technology</SelectTechnology>
            ))}
        </div>
    </div>
  )
}

export default TechnologiesBlock