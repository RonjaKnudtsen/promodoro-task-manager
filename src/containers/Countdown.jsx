import React, { Component } from 'react';
import Button from '../components/Button';
import alarm from '../assets/sounds/alarm.mp3';

class Countdown extends Component{
    constructor(props){
        super(props);
        let activePromodoro = props.task.promodoros.filter(x => x.activeTask);
        console.log("ACTIVE PROMODORO:", activePromodoro);

        if(activePromodoro.length === 0){
            activePromodoro = this.initializeFirstPromodoro();
            console.log("ACTIVE PROMODORO:", activePromodoro);
        } else {
            activePromodoro = activePromodoro[0];
        }
        this.state = {
            onBreak: activePromodoro.break,
            minutes: activePromodoro.minutesLeft,
            seconds: activePromodoro.secondsLeft,
            timerStopped: false,
        }
    }

    componentDidMount = () => {
        //Start timer
        this.time();
    }

    componentWillUnmount = () => {
        //Stop timer
        clearInterval(this.timer);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevState.onBreak !== this.state.onBreak){
            this.playSound();
        }
    }
    initializeFirstPromodoro = () => {
        return this.createNewPromodoro(25, 0, false, true);
    }
    createNewPromodoro = (minutesLeft, secondsLeft, onBreak, activeTask) => {
        const {promodoros, key} = this.props.task;

        const activePromodoro = promodoros.filter(x => x.active)[0];
        const promodoro = {
            minutesLeft, secondsLeft, break: onBreak, activeTask
        }
        this.props.createPromodoro(key, promodoro);
        return promodoro;
    }
    //Update prodoro in global state.
    updatePromodoroTimer = (minutesLeft, secondsLeft, onBreak, activeTask) => {
        const {promodoros, key} = this.props.task;

        const activePromodoro = promodoros.filter(x => x.active)[0];
        this.props.updateActivePromodoro(key, {
            minutesLeft, secondsLeft, break: onBreak, activeTask
        })
    }

    finishTask = () => {
        const {key} = this.props.task;
        //End current promodoro
        const {minutes, seconds, onBreak} = this.state;
        this.props.updateActivePromodoro(key, {
            minutesLeft: minutes,
            secondsLeft: seconds, 
            break: onBreak, 
            activeTask: false,
        });
        clearInterval(this.timer);

        //Set task as finished
        this.props.finishTask(key);
    }

    playSound = () => {
        console.log("PLAY SOUND");
        const sound = new Audio(alarm);
        sound.play();
    }

    time = () => {
        console.log("TIME");
        this.timer = setInterval(() => {
            const {minutes, seconds, onBreak} = this.state;
            let m = minutes;
            let s = seconds;
            let b = onBreak;
            if(seconds === 0){
                m--;
                s = 59
            } else {
                s--;
            }
            if(minutes === 0 && seconds === 0){
                // TIMER COMPLETED, GO TO NEXT PHASE
                // We have reaced our goal, 
                // switch state, set new timer duration, 
                // save promodoro to task history
                this.updatePromodoroTimer(minutes, seconds, onBreak, false);
                if(onBreak){
                    //we were on break, reset to 25 min
                    m = 25;
                    s = 0;
                } else {
                    //get break duration
                    const {breakInterval} = this.props.task;
                    m = breakInterval;
                    s = 0;
                }
                b = !onBreak;

                //PROMODORO HISTORY MUST BE SAVED IN LOCAL STATE
                
                this.createNewPromodoro(m, s, onBreak, true);
            }
            this.setState({...this.state, seconds: s, minutes: m, onBreak: b})

            this.updatePromodoroTimer(m, s, onBreak, true);
        }, 1000);
        
    }
    
    toggleTimer = () => {
        const {timerStopped} = this.state;
        if(timerStopped){
            this.time();
        } else {
            clearInterval(this.timer);
        }
        this.setState({timerStopped: !timerStopped});
    }

    render(){
        const {task} = this.props;
        const {seconds, minutes, onBreak, timerStopped} = this.state;

        let message = "";
        if(timerStopped){
            message = "Timer stopped";
        } else if(onBreak) {
            message = "Minutes until work";
        } else {
            message = "Minutes until break, you can do it!";
        }
        
        return(
            <div style={{textAlign: 'center'}}>
                <h1 className={`timer-countdown ${timerStopped ? 'paused' : ''} ${onBreak ? 'on-break' : ''}`}
                    style={{marginBottom: 0}}
                >
                {minutes < 10 ? '0' : null}{minutes}:{seconds < 10 ? '0' : null}{seconds}</h1>
                
                <p style={{margin: 0}}>
                    {message}
                </p>

                <Button label="Task finished" color="green" size="medium" onClick={() => this.finishTask()}/>
                <Button label={`${timerStopped ? 'Start timer' : 'Stop timer'}`} size="medium" color={timerStopped ? "green" : "yellow"} onClick={() => this.toggleTimer()}/>
            </div>
        )
    }
}

export default Countdown;