import React, { Component } from 'react';
import Layout from './components/Layout';
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import moment from 'moment';

class App extends Component {
  componentWillMount = () => {
    moment.locale('en-gb');
  }
  render() {
    return (
      <BrowserRouter basename={'/promodoro-task-manager'}>
          <div className="App">
              <Layout />
          </div>
        
        </BrowserRouter>
    );
  }
}

function mapStateToProps(state){
  return {
    tasks: state.tasks,
    timer: state.timer,
  }
};

export default connect(mapStateToProps)(App);