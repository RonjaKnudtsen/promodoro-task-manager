import React, { Component } from 'react';
import Button from '../components/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskActions from '../actions/taskActions';
import { withRouter } from 'react-router-dom';

class TaskForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            input: {
                taskName: {
                    label: "task name", //Friendly name shown in error message
                    value: "", 
                    valid: false, 
                    errorMessage: "", //If not valid, save error message here
                    touched: false, //After first blur it is considered touched and will show error message if wrong
                    validate: [
                        {rule: this.longerThan, param: 2}, //all rule functions will be executed on input blur, using the param in the rule and the value.  
                    ]
                },
                breakInterval: {
                    label: "break interval", 
                    value: 10, 
                    valid: true, 
                    errorMessage: "", 
                    touched: false, 
                    validate: [
                        {rule: this.biggerThan, param: 0}, 
                        {rule: this.lessThen, param: 60}
                    ]
                }
            }
        }
    }

    submit = () => {
        //Do validation again, if everything is valid, create task, redirect to timer and task
        const {input} = this.state;
        const invalid = Object.keys(input).filter(x => {
            return !this.validate(input[x].value, x);
        })
        if(invalid.length > 0){
            console.warn("Fix errors before submitting");
        } else {
            //Simple generation of key, removing special characters, spaces and converts to lowercase
            let genKey = input.taskName.value
            .toLowerCase()
            .replace(/\s/g, '')
            .replace(/[^\w\s]/gi, '');

            const breakInterval = parseInt(input.breakInterval.value, 2);
            
            //Do redux action to create a global task.
            this.props.taskActions.CreateTask({key: genKey, name: input.taskName.value, breakInterval, finished: false});
            
            //TODO: Show toast?
            this.props.history.push(`task/${genKey}`);
        }
    }

    onChange = (e) => {
        const {value, name} = e.target;
        const {input} = this.state;
        input[name].value = value;
        this.setState({input});

        //Error message will be removed without having to blur out after an error message have appeared.
        if(input[name].touched){
            this.validate(value, name);
        }
    }

    onBlur = (e) => {
        const {value, name} = e.target;
        this.validate(value, name);
    }

    validate = (value, name) => {
        //Do form validation
        const validationRules = this.state.input[name].validate;

        const valid = validationRules.filter(x => {
            return x.rule(x.param, value, name);
        });

        //Valid.length is the number of validation checks it has passed.
        const {input} = this.state;
        input[name].valid = valid.length === validationRules.length;
        input[name].touched = true;
        this.setState({input});
        return valid.length === validationRules.length;
    }

    //Some form validation rules
    biggerThan = (biggerThan, value, name) => {
        if(value > biggerThan){
            return true
        }
        const {input} = this.state;
        const friendlyName = input[name].label;
        input[name].errorMessage = `${friendlyName} must be bigger than ${biggerThan}`;
        this.setState({input});
        return false
    }
    longerThan = (longerThan, value, name) => {
        if(value.length > longerThan){
            return true
        }
        const {input} = this.state;
        const friendlyName = input[name].label;
        input[name].errorMessage = `${friendlyName} must be longer than ${longerThan} characters`;
        this.setState({input});
        return false
    }
    lessThen = (lessThen, value, name) => {
        if(value <= lessThen){
            return true
        }
        //TODO: Fix so this is not repeated for each rule.
        const {input} = this.state;
        const friendlyName = input[name].label;
        input[name].errorMessage = `${friendlyName} must be less then ${lessThen} minutes`;
        this.setState({input});
        return false
    }

    render(){
        const {taskName, breakInterval} = this.state.input;
        return(
            <form>
                <div  className={`input-box  ${!taskName.valid && taskName.touched ? 'error-input' : ''}`}>
                    <input 
                        value={taskName.value} 
                        onChange={this.onChange.bind(this)} 
                        onBlur={this.onBlur.bind(this)}
                        size={30}
                        name="taskName"
                        id="taskName"
                        className={taskName.value.length <= 0 && !taskName.touched ? "" : "floating"}
                    />
                    <label>Task Name</label>
                    {!taskName.valid && taskName.touched ? <p className="error-message"> {taskName.errorMessage} </p> : ""}
                </div>
                <div className={`input-box  ${!breakInterval.valid && breakInterval.touched ? 'error-input' : ''}`}>
                    <input 
                        value={breakInterval.value} 
                        onChange={this.onChange.bind(this)} 
                        onBlur={this.onBlur.bind(this)}
                        name="breakInterval" size={1} 
                        id="breakInterval"
                        className={breakInterval.value >= 0 ? "floating" : ""}
                    />
                    <label>Break interval</label>
                    minutes

                    {/* If the input field has not been touched, dont show anything. If it is tocuhed and is invalid show "not valid"*/}
                    {!breakInterval.valid && breakInterval.touched ? <p className="error-message"> {breakInterval.errorMessage} </p> : ""}
                </div>
                <Button color="green" onClick={() => this.submit()} label="Start"/>
                
            </form>
        )
    }
}

const mapStateToProps = state => ({
      tasks: state.tasks,
});

const mapDispatchToProps = dispatch => ({
    taskActions: bindActionCreators(taskActions, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskForm));