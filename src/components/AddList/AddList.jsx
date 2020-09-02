import React, {useState} from 'react';
import List from "../List/List";

import './AddList.scss';

const AddList = (props) => {
    const [visiblePopup, setvisiblePopup] = useState(false);

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
                    1234
                </div>
            )}
        </div>
    );
}

export default AddList;