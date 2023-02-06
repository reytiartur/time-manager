import React from 'react'
import TaskItem from './TaskItem'
import './TasksPreview.scss'

const TasksPreview = ({timebank, selectedDate}) => {
    const hasDate = timebank.findIndex(item => item.date?.hasOwnProperty(selectedDate));
    const tasks = timebank[hasDate]?.date[selectedDate][0]
    const sorted = [...tasks].sort((a, b) => {
        return a.comment !== '' ? 1 : b.comment !== '' ? -1 : 0
    });

    return (
        <div className='tasks-preview'>
            {sorted.map(task => (
                <TaskItem key={task?.selected + task.hour + Math.random()} name={task.selected} hour={task.hour} comment={task.comment} />
            ))}
        </div>
    )
}

export default TasksPreview