import React from 'react';

const Header = (props) => {
    return (
        <div className={props.className}>
            <span>{props.card.Title}  - </span>
            <span>{props.card.Year}</span>
        </div>
    )
}

export default Header;