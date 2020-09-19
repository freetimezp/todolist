import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {List, Badge} from '../components.js';

import closeSvg from '../../assets/img/close.svg';

import './AddList.scss';

const AddList = ({colors, onAddListItem}) => {
    const [visiblePopup, setvisiblePopup] = useState(false);
    const [selectedColor, setSelectedColor] = useState(3);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (Array.isArray(colors)) {
            setSelectedColor(colors[0].id);
        }
    }, [colors]);

    const onClose = () => {
        setvisiblePopup(false);
        setInputValue('');
        setSelectedColor(colors[0].id);
    }

    const addListItem = () => {
        if (!inputValue) {
            alert('Введите название списка задач');
            return;
        }
        setIsLoading(true);
        axios.post('http://localhost:3001/lists', {name: inputValue, colorId: selectedColor})
            .then(
                ({data}) => {
                    const color = colors.filter(c => c.id === selectedColor)[0].name;
                    const listObj = {...data, color: {name: color}}; //create copy of data and add new object color
                    onAddListItem(listObj);
                    onClose();
                })
            .catch(() => {
                alert('Ошибка при добавлении списка');
            })
            .finally(() => { // no metter true or false with .then after set state(false)
                setIsLoading(false);
            });
    }

    return (
        <div className="add-list">
            <List
                onClick={() => setvisiblePopup(true)} // use !visiblePopup for toggle
                items={[
                    {
                        className: "list__add-button",
                        icon: (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="12" width="12"
                                viewBox="0 0 16 16" fill="none">
                                <path
                                    d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                                <path
                                    d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                            </svg>),
                        name: 'Добавить список'
                    }
                ]}
            />
            {visiblePopup && (
                <div className="add-list__popup">
                    <img
                        src={closeSvg}
                        onClick={onClose}
                        alt="close button"
                        className="add-list__popup-close-btn"/>
                    <input
                        value={inputValue}
                        onChange={
                            event => setInputValue(event.target.value)
                        }
                        className="field"
                        type="text"
                        placeholder="Название списка"/>
                    <div className="add-list__popup-colors">
                        {
                            colors.map(color => (
                                <Badge onClick={() => {
                                    setSelectedColor(color.id)
                                }}
                                       key={color.id}
                                       color={color.name}
                                       className={selectedColor === color.id && 'active'}
                                />
                            ))
                        }
                    </div>
                    <button onClick={addListItem} className="button">
                        {isLoading ? 'Добавление...' : 'Добавить'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default AddList;