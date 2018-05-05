import React from 'react';
import ReactDOM from 'react-dom';
import TaskList from './TaskList';
import Enzyme, { shallow, render, mount } from 'enzyme';
//Dependencies
import { createStore } from 'redux';
import initialState from '../reducers/initialState';
import rootReducer from '../reducers/rootReducer';

describe('<TaskList />', () => {
  it('Renders the <TaskList /> component without crashing', () => {
    const wrapper = shallow(<TaskList/>);
    expect(wrapper.length).toEqual(1);
  });

  // Does not show any label/text if no tasks are in log

  // seperates finished tasks from unfinished tasks

});