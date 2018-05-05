import React, { Component } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

class HomePage extends Component{
    render(){
        return(
            <div className="homepage">
                <h2 className="page-title">Promodoro timer</h2>
                <TaskForm />
                <TaskList />
            </div>
        )
    }
}

export default HomePage;