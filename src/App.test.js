import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme, { shallow, render, mount } from 'enzyme';
//Dependencies
import { createStore } from 'redux';
import initialState from './reducers/initialState';
import rootReducer from './reducers/rootReducer';

describe('<App />', () => {
  it('Renders the <App /> component without crashing', () => {
    const store = createStore(rootReducer, initialState);
    const wrapper = shallow(<App store={store}/>);
    expect(wrapper.length).toEqual(1);
  });

  /*it('renders a layout component', () => {
    const store = createStore(rootReducer, initialState);
    const wrapper = shallow(<App store={store}/>);
    console.log(wrapper.debug());
    expect(wrapper.find('.App')).toEqual(1);
  });*/
});