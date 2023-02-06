import React from 'react'
import { createContext, useState } from "react";

export const DateContext = createContext({
    selectedDate: new Date().toDateString(), 
    setSelectedDate: () => '',
    activeDate: new Date(), 
    setActiveDate: () => '' 
})
 
export const DateProvider = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
    const [activeDate, setActiveDate] = useState(new Date());

  const value = { selectedDate, setSelectedDate, activeDate, setActiveDate }

  return <DateContext.Provider value={value}>{children}</DateContext.Provider>
}