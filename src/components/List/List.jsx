import React from 'react';
import axios from 'axios';

import {Badge} from '../components';

import removeSvg from '../../assets/img/close.svg';

import './List.scss';
import classNames from 'classnames';

const List = ({items, isRemovable, onClick, onRemove}) => {
    const removeList = (item) => {
        if(window.confirm('Вы действительно хотитет удалить список?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id);

            });
        }
    };
    return (
        <ul onClick={onClick} className="list">
            {items.map((item, index) => (
                <li key={index} className={classNames(item.className, {'active': item.active})}>
                    <i>
                        {item.icon ? item.icon : <Badge color={item.color.name}/>}
                    </i>
                    <span>{item.name}</span>
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