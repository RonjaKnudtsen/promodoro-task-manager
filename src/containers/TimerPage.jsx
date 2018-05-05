import React, { Component } from 'react';
import { connect } from 'react-redux';
import Countdown from './Countdown';
import PromodoroHistory from './PromodoroHistory';
import { bindActionCreators } from 'redux';
import * as taskActions from '../actions/taskActions';
import { withRouter } from 'react-router-dom';

class TimerPage extends Component{
    createPromodoro = (taskId, promodoro) => {
        this.props.taskActions.CreatePromodoro(taskId, promodoro);
    }

    updateActivePromodoro = (taskId, update) => {
        this.props.taskActions.UpdateActivePromodoro(taskId, update);
    }   

    finishTask = (taskId) => {
        this.props.taskActions.FinishTask(taskId);
    }

    render(){
        const {taskid} = this.props.match.params;
        const {tasks} = this.props;

        //if no tasks exist dont loop and filter.
        if(tasks.allTasks.length > 0 ){
            const task = tasks.tasks[taskid];
            return(
                <div>
                    <h2 className="page-title">{task.name}</h2>
                    {
                        task.finished ?
                        <p style={{textAlign: 'center'}}>Task is finished </p>
                        : <Countdown 
                        task={task} 
                        updateActivePromodoro={this.updateActivePromodoro} 
                        createPromodoro={this.createPromodoro}
                        finishTask={this.finishTask}
                    />
                    }
               
                <PromodoroHistory task={task} />
                </div>
            )
        }
        //Show list of other tasks
        return (
            <p> No timer with key "{taskid}" exists </p> 
        )
    }
}

const mapStateToProps = state => ({
    tasks: state.tasks,
});

const mapDispatchToProps = dispatch => ({
    taskActions: bindActionCreators(taskActions, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TimerPage));