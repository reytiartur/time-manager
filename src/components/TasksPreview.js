import React from 'react'
import TaskItem from './TaskItem'
import './TasksPreview.scss'

const TasksPreview = ({timebank, selectedDate}) => {
    const hasDate = timebank.findIndex(item => item.date?.hasOwnProperty(selectedDate));
    const tasks = timebank[hasDate]?.date[selectedDate]
    const noComment = tasks.filter(task => task.comment === "")
    const comment = tasks.filter(task => task.comment !== "")

    return (
        <div className='tasks-preview'>
            <div className="not-commented">
                {noComment.map(task => (
                    <TaskItem key={task?.selected + task.hour + Math.random()} name={task.selected} hour={task.hour} comment={task.comment} />
                ))}
            </div>
            <div className="commented">
                {comment.map(task => (
                    <TaskItem key={task?.selected + task.hour + Math.random()} name={task.selected} hour={task.hour} comment={task.comment} />
                ))}
            </div>
        </div>
    )
}

export default TasksPreview