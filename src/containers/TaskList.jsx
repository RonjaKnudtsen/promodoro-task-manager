import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskCard from '../components/TaskCard';
import { withRouter } from 'react-router-dom';

class TaskList extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        console.log(this.props);
    }
    render(){
        const {tasks} = this.props;

        const finishedTasks = tasks.allTasks.filter(x => tasks.tasks[x].finished);
        const unfinished = tasks.allTasks.filter(x => !tasks.tasks[x].finished);
        console.log("finishedTasks", finishedTasks);
        console.log("unfinished", unfinished);
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
