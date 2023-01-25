import React from 'react'
import SelectTechnology from './SelectTechnology'
import './NewProject.scss'

const TechnologiesBlock = ({inputs, setInputs}) => {
  
  return (
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
  )
}

export default TechnologiesBlock