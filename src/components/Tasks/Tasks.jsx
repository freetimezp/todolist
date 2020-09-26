import React from 'react';
import axios from 'axios';

import AddTasksForm from "./AddTasksForm";
import Task from "./Task.jsx";

import './Tasks.scss';

import editSvg from '../../assets/img/edit.svg';

const Tasks = ({list, onEditTitle, onAddTask, onEditTask, onRemoveTask, withoutEmpty}) => {

    const editTitle = () => {
        const newTitle = window.prompt('Название списка', list.name);
        if (newTitle) {
            onEditTitle(list.id, newTitle);
            axios
                .patch('http://localhost:3001/lists/' + list.id, {
                    name: newTitle
                })
                .catch(() => {
                    alert('Не удалось обновить название списка задач');
                });
        }
    }


    return (
        <div className="tasks">
            <h2 style={{color: list.color.hex}} className="tasks__title">
                {list.name}
                <img onClick={editTitle} src={editSvg} alt="edit icon"/>
            </h2>
            <div className="tasks__items">
                {!withoutEmpty && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
                {
                    list.tasks.map(task =>
                        <Task
                            key={task.id}
                            task={task}
                            list={list}
                            onRemoveTask={onRemoveTask}
                            onEditTask={onEditTask}
                        />
                    )
                }
                <AddTasksForm list={list} onAddTask={onAddTask}/>
            </div>
        </div>
    );
}

export default Tasks;