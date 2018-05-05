import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskCard from '../components/TaskCard';
import { withRouter } from 'react-router-dom';

class TaskList extends Component{
    render(){
        const {tasks} = this.props;
        const finishedTasks = tasks.allTasks.filter(x => tasks.tasks[x].finished);
        const unfinished = tasks.allTasks.filter(x => !tasks.tasks[x].finished);
        
        return(
            <div>
                <div className="task-list unfinished">
                    {unfinished.map(x => (
                        <TaskCard {...tasks.tasks[x]} onClick={() => this.props.history.push(`task/${tasks.tasks[x].key}`) } />
                    ))}
                </div>

                {finishedTasks.length > 0 ? 
                    <h4 style={{marginBottom: 0}}>Finished tasks</h4>
                    : null 
                }
            
                <div className="task-list finished">
                    {finishedTasks.map(x => (
                        <TaskCard {...tasks.tasks[x]} onClick={() => this.props.history.push(`task/${tasks.tasks[x].key}`) } />
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    tasks: state.tasks,
});

export default withRouter(connect(mapStateToProps)(TaskList));
