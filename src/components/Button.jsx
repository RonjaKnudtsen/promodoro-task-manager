import React from 'react';

const Button = ({onClick, color, className, label, size}) => {
    return(
        <div 
            className={`${color} ${className} ${size} ui-button` } 
            onClick={() => onClick()}
        >
            {label}
        </div>
    );
}

export default Button;