import React from 'react'
import { CommentIcon } from '../assets/svgs'
import './TaskItem.scss'

const TaskItem = ({name, hour, comment}) => {
  return (
    <div className={!comment ? 'task' : 'task task__full'}>
        <div className="text-container">
          <p className="task-name">{name}</p>
          <p className="task-hour">{hour}h</p>
        </div>
        {comment ? <div className="comment-container">
          <div className="icon-wrapper"><CommentIcon /></div>
          <p className="task-comment">{comment}</p>
        </div> : null}
    </div>
  )
}

export default TaskItem