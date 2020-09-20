import React from 'react';
import axios from 'axios';

import {Badge} from '../components';

import removeSvg from '../../assets/img/close.svg';

import './List.scss';
import classNames from 'classnames';

const List = ({items, isRemovable, onClick, onRemove, onClickItem, activeList}) => {
    const removeList = (item) => {
        if (window.confirm('Вы действительно хотитет удалить список?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id);

            });
        }
    };
    return (
        <ul onClick={onClick} className="list">
            {items.map((item, index) => (
                <li
                    key={index}
                    className={classNames(item.className, {
                        active: item.active
                            ? item.active
                            : activeList && activeList.id === item.id
                    })}
                    onClick={onClickItem ? () => onClickItem(item) : null}
                >
                    <i>
                        {item.icon ? item.icon : <Badge color={item.color.name}/>}
                    </i>
                    <span>
                        {item.name}
                        {item.tasks && ` (${item.tasks.length})`}
                    </span>
                    {isRemovable && (
                        <img
                            onClick={() => removeList(item)}
                            className="list__remove-icon"
                            src={removeSvg}
                            alt="remove list"/>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default List;