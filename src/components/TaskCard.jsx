import React from 'react';

const TaskCard = ({promodoros, name, onClick}) => {
    return(
        <div onClick={() => onClick()}>
            <div className="task-list-item">
                <h3>{name}</h3>
                <p>{promodoros.length - 1} promodoros completed.</p>
            </div>
        </div>
    );
}

export default TaskCard;

//Better presentation of promodoros. Know and show how many are completed and how many are in progress.