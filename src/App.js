import React, {useState} from 'react';

import List from "./components/List/List";
import AddList from "./components/AddList/AddList";
import Tasks from "./components/Tasks/Tasks";

import DB from './assets/DB.json';


function App() {
    const [lists, setLists] = useState(
        DB.lists.map( item => {
            item.color = DB.colors.filter(
                color => color.id === item.colorId
            )[0].name;
            return item;
        })
    );

    const onAddListItem = (obj) => {
        const newLists = [
            ...lists,
            obj
        ];
        setLists(newLists);
    };

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
                    items={lists}
                    isRemovable={true}
                    onRemove={ (list) => {console.log(list);} }
                />
                <AddList onAddListItem={onAddListItem} colors={DB.colors} />
            </div>
            <div className="todo__tasks">
                <Tasks />
            </div>
        </div>
    );
}

export default App;
