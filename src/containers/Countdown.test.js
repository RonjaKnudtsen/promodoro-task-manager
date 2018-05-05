import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from './Countdown';
import Enzyme, { shallow, render, mount } from 'enzyme';
//Dependencies
import { createStore } from 'redux';
import initialState from '../reducers/initialState';
import rootReducer from '../reducers/rootReducer';

function timerGame(callback) {
    console.log('Ready....go!');
    setTimeout(() => {
      console.log('Times up -- stop!');
      callback && callback();
    }, 1000);
  }

describe('<Countdown />', () => {
    it('Renders the <Countdown /> component without crashing', () => {
        const task = initialState.tasks.tasks["task1"];
        const wrapper = shallow(<Countdown task={task}/>);
        expect(wrapper.length).toEqual(1);
    });

    // Displays the correct time at mount.
    it('Displays the correct time at mount, based on seconds and minutes left.', () => {
        const task = initialState.tasks.tasks["task1"];
        const wrapper = shallow(<Countdown task={task}/>);

        const countdownTime = wrapper.find('h1.timer-countdown').text();
        let expectedMinutesLeft = task.promodoros.filter(x => x.activeTask === true)[0]
        .minutesLeft;
        let expectedSecondsLeft = task.promodoros.filter(x => x.activeTask === true)[0]
        .secondsLeft;

        //Add 0 prefix if less than 10.
        if(expectedMinutesLeft < 10){
            expectedMinutesLeft = "0" + expectedMinutesLeft;
        }
        if(expectedSecondsLeft < 10){
            expectedSecondsLeft = "0" + expectedSecondsLeft;
        }

        const expectedTimer = expectedMinutesLeft + ":" + expectedSecondsLeft;
        expect(countdownTime).toEqual(expectedMinutesLeft + ":" + expectedSecondsLeft);
    });

    it('Displays correct time after 1 minute and 1 second', () => {
        jest.useFakeTimers();
        //Create a task with time left to 10:04
        const minutesLeft = 10;
        const secondsLeft = 4;
        const task = {
            key: 'test',
            name: 'Task 1',
            breakInterval: 10,
            finished: false,
            promodoros: [
                {minutesLeft: 0, secondsLeft: 0, break: false, activeTask: false, startTime: 1525365941243},
                {minutesLeft, secondsLeft, break: true, activeTask: true,  startTime: 1525521036018},
            ]
        };

        const dummyFunc = () => {} //We dont need to update redux to test the container.
        const wrapper = mount(<Countdown task={task} updateActivePromodoro={dummyFunc}/>);

        let countdownTime = wrapper.find('h1.timer-countdown').text();
        expect(countdownTime).toEqual("10:04");

        jest.runTimersToTime(61000); //increase by 1m and 1s

        countdownTime = wrapper.find('h1.timer-countdown').text();
        jest.clearAllTimers();
        expect(countdownTime).toEqual("09:03");
    })

    it('Switches to break timer and uses correct breakinterval after a work session', () => {
        jest.useFakeTimers();
        //Create a task with 1 minute left, and a break interval for 5m
        const minutesLeft = 1;
        const secondsLeft = 0;
        const expectedBreakInterval = 5;
        const dummyFunc = () => {} //Dummy prop function
        const task = {
            key: 'test',
            name: 'Task 1',
            breakInterval: expectedBreakInterval,
            finished: false,
            promodoros: [
                {minutesLeft, secondsLeft, break: false, activeTask: true,  startTime: 1525521036018},
            ]
        };
        const wrapper = mount(<Countdown task={task} updateActivePromodoro={dummyFunc} createPromodoro={dummyFunc}/>);

        //Find the initial timer
        let countdownTime = wrapper.find('h1.timer-countdown').text();
        expect(countdownTime).toEqual("01:00");

        jest.runTimersToTime(60000); //increase by 1m and 1s

        countdownTime = wrapper.find('h1.timer-countdown').text();
        expect(countdownTime).toEqual("00:00");

        jest.runTimersToTime(1000); //increase by 1s

        countdownTime = wrapper.find('h1.timer-countdown').text();
        expect(countdownTime).toEqual(`0${expectedBreakInterval}:00`);

        jest.clearAllTimers();
    })

});