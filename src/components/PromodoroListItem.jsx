import React from 'react';
import moment from 'moment';
import {Icon} from "react-font-awesome-5";

const PromodoroListItem = ({promodoro, breakInterval}) => {

    return(
        <div className="promodoro-list-item">
            <p className="time">{moment(promodoro.startTime).calendar()}</p>
            <p className="description">
                <Icon.DotCircle color={promodoro.break ? "#d8cd37" : "#36a266"} style={{padding: '0 5px'}}/> 
                 {promodoro.break ? `${breakInterval - promodoro.minutesLeft } minutes break` : `${25-promodoro.minutesLeft} minutes work`}</p>
        </div>
    );
}

export default PromodoroListItem;

//Better presentation of promodoros. Know and show how many are completed and how many are in progress.