
import React, { Component } from 'react';
import PromodoroListItem from '../components/PromodoroListItem';

class PromodoroHistory extends Component{
    render(){
        const {task} = this.props;
        const promodoroList = task.promodoros.filter(x => x.activeTask !== true); //make new array copy
        //Sort by reversed date.
        promodoroList.sort((a, b) => {
            return new Date(b.startTime) - new Date(a.startTime);
        });
        if(promodoroList.length > 0){
            return(
                <div className="promodoro-list" style={{marginTop: 100}} >
                    <h4 style={{marginBottom: 5}}>Promodoro history </h4>
                    {promodoroList.map(promodoro => (
                    <PromodoroListItem key={promodoro.startTime} promodoro={promodoro} breakInterval={task.breakInterval} />
                    ))}
                    
                </div>
            )
        }
        else{
            return (<div />)
        }
    }
}

export default PromodoroHistory;
