import React from 'react';
import listSvg from '../assets/img/listSvg.svg';

const List = (props) => {
    return (
        <ul className="todo__list">
            <li className="active">
                <i>
                    <img src={listSvg} alt="list icon" />
                </i>
                <span>Все задачи</span>
            </li>
        </ul>
    );
}

export default List;