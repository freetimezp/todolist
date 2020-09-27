import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Route, useHistory} from 'react-router-dom';

import {List, AddList, Tasks} from './components/components';

//import DB from './assets/DB.json'; yarn fake-json

function App() {

    const [lists, setLists] = useState(null);
    const [colors, setColors] = useState(null);
    const [activeItem, setActiveItem] = useState(null);
    let history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => {
            setLists(data);
        });
        axios.get('http://localhost:3001/colors').then(({data}) => {
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

    const onEditTask = (listId, taskId, taskText) => {
        const newTaskText = window.prompt('Текст задачи', taskText);
        if (!newTaskText) {
            return;
        }
        const newList = lists.map(list => {
            if (list.id === listId) {
                list.tasks = list.tasks.map(task => {
                    if (task.id === taskId) {
                        task.text = newTaskText;
                    }
                    return task;
                });
            }
            return list;
        });
        setLists(newList);
        axios
            .patch('http://localhost:3001/tasks/' + taskId, {text: newTaskText})
            .catch(() => {
                alert('Не удалось изменить задачу');
            });
    }

    const onRemoveTask = (listId, taskId) => {
        if (window.confirm('Вы действительно хотите удалить задачу?')) {
            const newList = lists.map(item => {
                if (item.id === listId) {
                    item.tasks = item.tasks.filter(task => task.id !== taskId);
                }
                return item;
            });
            setLists(newList);
            axios
                .delete('http://localhost:3001/tasks/' + taskId)
                .catch(() => {
                    alert('Не удалось удалить задачу');
                });
        }
    }

    const onEditListTitle = (id, title) => {
        const newLists = lists.map(list => {
            if (list.id === id) {
                list.name = title;
            }
            return list;
        });
        setLists(newLists);
    };

    const onCompleteTask = (listId, taskId, completed) => {
        const newList = lists.map(list => {
            if (list.id === listId) {
                list.tasks = list.tasks.map(task => {
                    if (task.id === taskId) {
                        task.completed = completed;
                    }
                    return task;
                });
            }
            return list;
        });
        setLists(newList);
        axios
            .patch('http://localhost:3001/tasks/' + taskId, {completed: completed})
            .catch(() => {
                alert('Не удалось обновить задачу');
            });
    };


    // this useEffect dont working normally
    useEffect(() => {
        const listId = history.location.pathname.split('/lists/')[1];
        //console.log(listId);
        if (lists) {
            const list = lists.find(list => list.id === Number(listId));
            setActiveItem(list);
            //console.log(history.location.pathname);
            //console.log(list);
            //console.log(activeItem);
        }
    }, [lists, history.location.pathname]);

    return (
        <div className="todo">
            <div className="todo__sidebar">
                <List
                    onClickItem={list => {
                        history.push(`/`);
                    }}
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
                            active: history.location.pathname === '/'
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
                        onClickItem={list => {
                            history.push(`/lists/${list.id}`);
                            setActiveItem(list);
                            //console.log(list);
                            //console.log(activeItem);
                            //console.log(history.location.pathname);
                            //console.log(history);
                        }}
                        activeItem={activeItem}
                    />
                ) : (
                    'Downloading lists.. wait..'
                )}
                <AddList onAddListItem={onAddListItem} colors={colors}/>
            </div>
            <div className="todo__tasks">
                <Route exact path="/">
                    {lists &&
                    lists.map(list => (
                        <Tasks
                            key={list.id}
                            list={list}
                            onAddTask={onAddTask}
                            onEditTitle={onEditListTitle}
                            onRemoveTask={onRemoveTask}
                            onEditTask={onEditTask}
                            onCompleteTask={onCompleteTask}
                            withoutEmpty
                        />
                    ))
                    }
                </Route>
                <Route path="/lists/:id">
                    {lists && activeItem && (
                        <Tasks
                            list={activeItem}
                            onAddTask={onAddTask}
                            onEditTitle={onEditListTitle}
                            onRemoveTask={onRemoveTask}
                            onEditTask={onEditTask}
                            onCompleteTask={onCompleteTask}
                        />
                    )}
                </Route>
            </div>
        </div>
    );
}

export default App;
