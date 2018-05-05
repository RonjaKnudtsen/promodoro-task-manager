import React from 'react';
import ReactDOM from 'react-dom';
import TaskForm from './TaskForm';
import Enzyme, { shallow, render, mount } from 'enzyme';
import {MemoryRouter} from 'react-router'
//Dependencies
import { createStore } from 'redux';
import initialState from '../reducers/initialState';
import rootReducer from '../reducers/rootReducer';

describe('<TaskForm />', () => {
    it('Renders the <TaskForm /> component without crashing', () => {
        const wrapper = shallow(<TaskForm/>);
        expect(wrapper.length).toEqual(1);
    });

    it('Does not allow submission of unvalidated form, and shows error message', () => {
        const wrapper = mount(<MemoryRouter><TaskForm.WrappedComponent/></MemoryRouter>);

        wrapper.find('Button').simulate('click');
        const taskform = wrapper.find('form');
        const errormessage = wrapper.find('.error-message');
        expect(errormessage.length).toEqual(1);
    });

    it('Displays error message when blurring empty input field', () => {
        const wrapper = mount(<MemoryRouter><TaskForm.WrappedComponent/></MemoryRouter>);

        wrapper.find('#taskName').simulate('blur');
        const taskform = wrapper.find('form');
        const errormessage = wrapper.find('.error-message');
        expect(errormessage.length).toEqual(1);
    });

});