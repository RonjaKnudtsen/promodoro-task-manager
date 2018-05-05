import React, { Component } from 'react';
import {Route } from 'react-router-dom'
import HomePage from './HomePage';
import TimerPage from './TimerPage';

class MainRoutes extends Component{
    render(){
        return(
            <div>
                <Route exact path="/" component={HomePage} />
                <Route path="/task/:taskid" component={TimerPage} />
            </div>
        )
    }
}

export default MainRoutes;