import React, { useEffect, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '../assets/svgs';
import CustomButton from './CustomButton'
import './CustomCarousel.scss'

const CustomCarousel = ({data, selected, handleClick}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(data.length)
    const show = 3

    const handleBack = () => {
        setCurrentIndex((state) => {return currentIndex === 0 ? state : state - 1})
    }

    const handleForward = () => {
        setCurrentIndex((state) => {return currentIndex <= (length - show - 1) ? state + 1 : state})
    }

    useEffect(() => {
        setLength(data.length)
    }, [data])

  return (
    <div className="carousel-container">
        <div className="icon-wrapper" style={currentIndex === 0 ? {cursor: 'alias'} : null} onClick={handleBack}>
            {currentIndex > 0 ? <ArrowLeftIcon /> : null}
        </div>
        <div className="carousel-slider">
            <div className="buttons-container" style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}>
                {data.map((bank, i) => (
                    <CustomButton key={bank.name} size='timebank' onClick={() => handleClick(bank.name)} className={i === selected ? "custom-button custom-button__timebank active" : "custom-button custom-button__timebank"}>{bank.name}</CustomButton>
                ))}
            </div>
        </div>
        <div className="icon-wrapper" style={currentIndex >= length - show  ? {cursor: 'alias'} : null} onClick={handleForward}>
            {currentIndex <= length - show - 1 ? <ArrowRightIcon /> : null}
        </div>
    </div>
  )
}

export default CustomCarousel