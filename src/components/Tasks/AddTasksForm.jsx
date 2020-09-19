import React, {useState} from 'react';
import axios from 'axios';

import addSvg from "../../assets/img/add.svg";

const AddTasksForm = ({list, onAddTask}) => {
    const [visibleForm, setVisibleForm] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm);
        setInputValue('');
    }

    const addTask = () => {
        const taskObj = {
            listId: list.id,
            text: inputValue,
            completed: false
        };
        setIsLoading(true);
        axios
            .post('http://localhost:3001/tasks', taskObj).then(
            ({data}) => {
                onAddTask(list.id, data);
                toggleFormVisible();
            })
            .catch(() => {
                alert('Ошибка при добавлении задачи');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="tasks__form">
            {!visibleForm
                ? <div onClick={toggleFormVisible} className="tasks__form-new">
                    <img src={addSvg} alt="add tasks"/>
                    <span>Новая задача</span>
                </div>
                : <div className="tasks__form-block">
                    <input
                        value={inputValue}
                        className="field"
                        type="text"
                        placeholder="Текст задачи"
                        onChange={e => setInputValue(e.target.value)}
                    />
                    <button
                        disabled={isLoading} // disabled if true
                        className="button"
                        onClick={addTask}
                    >
                        {!isLoading
                            ? 'Добавить задачу'
                            : 'Добавление...'}
                    </button>
                    <button onClick={toggleFormVisible} className="button button--cancel">Отмена</button>
                </div>
            }
        </div>
    );
}

export default AddTasksForm;

