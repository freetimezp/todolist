import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';

import {List, AddList, Tasks} from './components/components';

//import DB from './assets/DB.json'; yarn fake-json

function App() {

    const [lists, setLists] = useState(null);
    const [colors, setColors] = useState(null);
    const [activeList, setActiveList] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => { // get data from response
            setLists(data);
        });
        axios.get('http://localhost:3001/colors').then(({data}) => { // get data from response
            setColors(data);
        });
    }, []);

    const onAddListItem = (obj) => {
        const newList = [...lists, obj];
        setLists(newList);
    };

    const onAddTask = (listId, taskObj) => {
        const newList = lists.map(item => {
            if (item.id === listId) {
                item.tasks = [...item.tasks, taskObj];
            }
            return item;
        });
        setLists(newList);
    };

    const onEditListTitle = (id, title) => {
        const newLists = lists.map(list => {
            if (list.id === id) {
                list.name = title;
            }
            return list;
        });
        setLists(newLists);
    }

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
                {lists ? ( // downloading lists from json server
                    <List
                        items={lists}
                        isRemovable={true}
                        onRemove={id => {
                            const newLists = lists.filter(item => item.id !== id); // exclude from lists deleted id
                            setLists(newLists);
                        }}
                        onClickItem={item => {
                            setActiveList(item);
                        }}
                        activeList={activeList}
                    />
                ) : (
                    'Downloading lists.. wait..'
                )}
                <AddList onAddListItem={onAddListItem} colors={colors}/>
            </div>
            <div className="todo__tasks">
                <Route exaxt path="/">
                    { lists &&
                        lists.map(list => (
                            <Tasks
                                list={list}
                                onEditTitle={onEditListTitle}
                                onAddTask={onAddTask}
                                withoutEmpty
                            />
                        ))
                    }
                </Route>
                <Route path="/lists/:id">
                    {lists && activeList
                    && <Tasks
                        list={activeList}
                        onEditTitle={onEditListTitle}
                        onAddTask={onAddTask}
                    />}
                </Route>
            </div>
        </div>
    );
}

export default App;
