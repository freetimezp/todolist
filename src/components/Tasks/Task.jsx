import React from 'react';

import editTask from '../../assets/img/editTask.svg';
import removeSvg from '../../assets/img/close.svg';

const Task = ({task, list, onRemoveTask, onEditTask, onCompleteTask}) => {
    const onChangeCheckbox = (e) => {
        onCompleteTask(list.id, task.id, e.target.checked);
    }
    return (
        <div key={task.id} className="tasks__items-row">
            <div className="checkbox">
                <input onChange={onChangeCheckbox} id={`task-${task.id}`} checked={task.completed} type="checkbox"/>
                <label htmlFor={`task-${task.id}`}>
                    <svg
                        width="11"
                        height="8"
                        viewBox="0 0 11 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                            stroke="#f2f2f2"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </label>
            </div>
            <p>{task.text}</p>
            <div className="tasks__items-row-actions">
                <div
                    onClick={() => {
                        onEditTask(list.id, task.id, task.text);
                    }}
                >
                    <img src={editTask} alt="edit icon"/>
                </div>
                <div
                    onClick={() => {
                        onRemoveTask(list.id, task.id);
                    }}
                >
                    <img src={removeSvg} alt="remove icon"/>
                </div>
            </div>
        </div>
    );
}

export default Task;