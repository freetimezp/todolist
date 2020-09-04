import React from 'react'

import './Badge.scss';

const Badge = ( { color } ) => {
    return (
        <i className={`badge badge--${color}`}/>
    );
}

export default Badge;