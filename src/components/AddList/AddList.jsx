import React, {useState} from 'react';

import List from "../List/List";
import Badge from "../Badge/Badge";

import './AddList.scss';


const AddList = ({colors}) => {
    const [visiblePopup, setvisiblePopup] = useState(true);

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
                    <input className="field" type="text" placeholder="Название списка"/>
                    <div className="add-list__popup-colors">
                        {
                            colors.map(color => <Badge key={color.id} color={color.name}/>)
                        }
                    </div>
                    <button className="button">Добавить</button>
                </div>
            )}
        </div>
    );
}

export default AddList;