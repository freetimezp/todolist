import React from 'react';
import List from "./components/List/List";

function App() {
    return (
        <div className="todo">
            <div className="todo__sidebar">
                <List
                    items={[
                        {
                            icon: (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24">
                                    <path
                                        d="M0 0h24v24H0z"
                                        fill="none"/>
                                    <path
                                        d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
                                    />
                                </svg>),
                            name: 'Все задачи',
                            active: true
                        }
                    ]}/>
                <List
                    items={[
                        {
                            color: "green",
                            name: 'Покупки'
                        },
                        {
                            color: "blue",
                            name: 'Фронтенд'
                        },
                        {
                            color: "pink",
                            name: 'Фильмы и сериалы'
                        },
                        {
                            color: "yellow",
                            name: 'Музыка'
                        },
                        {
                            color: "grey",
                            name: 'Личное'
                        }
                    ]}
                    isRemovable={true}/>
                <List
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
                    ]}/>
            </div>
            <div className="todo__tasks">

            </div>
        </div>
    );
}

export default App;
