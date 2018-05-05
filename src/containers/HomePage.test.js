import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';
import Enzyme, { shallow, render, mount } from 'enzyme';
//Dependencies
import { createStore } from 'redux';
import initialState from '../reducers/initialState';
import rootReducer from '../reducers/rootReducer';

describe('<HomePage />', () => {
    it('Renders the <HomePage /> component without crashing', () => {
        const wrapper = shallow(<HomePage/>);
        expect(wrapper.length).toEqual(1);
    });

});