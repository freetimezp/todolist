import React, {useState} from 'react';

import addSvg from "../../assets/img/add.svg";

const AddTasksForm = () => {
    const [visibleForm, setVisibleForm] = useState(false);

    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm);
    }

    return (
        <div className="tasks__form">
            {!visibleForm
                ? <div onClick={toggleFormVisible} className="tasks__form-new">
                    <img src={addSvg} alt="add tasks"/>
                    <span>Новая задача</span>
                </div>
                : <div className="tasks__form-block">
                    <input className="field" type="text" placeholder="Текст задачи"/>
                    <button className="button">Добавить задачу</button>
                    <button onClick={toggleFormVisible} className="button button--cancel">Отмена</button>
                </div>
            }
        </div>
    );
}

export default AddTasksForm;

