import React from 'react';
import {shallow} from 'enzyme';

import App from './App';
import Header from './layout/Header';
import Nav from './layout/Nav';
import Footer from './layout/Footer';
import Router from './layout/Router';

test('should render layout with header', () => {
    // GIVEN

    // WHEN
    const app = shallow(<App />);

    // THEN
    expect(app.find('header')).toHaveLength(1);
});

test('should render layout with header component', () => {
    // GIVEN

    // WHEN
    const app = shallow(<App />);

    // THEN
    expect(app.find(Header)).toHaveLength(1);
});

test('should render layout with nav', () => {
    // GIVEN

    // WHEN
    const app = shallow(<App />);

    // THEN
    expect(app.find('nav')).toHaveLength(1);
});

test('should render layout with nav component', () => {
    // GIVEN

    // WHEN
    const app = shallow(<App />);

    // THEN
    expect(app.find(Nav)).toHaveLength(1);
});

test('should render layout with footer', () => {
    // GIVEN

    // WHEN
    const app = shallow(<App />);

    // THEN
    expect(app.find('footer')).toHaveLength(1);
});

test('should render layout with footer component', () => {
    // GIVEN

    // WHEN
    const app = shallow(<App />);

    // THEN
    expect(app.find(Footer)).toHaveLength(1);
});

test('should render layout with article', () => {
    // GIVEN

    // WHEN
    const app = shallow(<App />);

    // THEN
    expect(app.find('article')).toHaveLength(1);
});

test('should render layout with router component', () => {
    // GIVEN

    // WHEN
    const app = shallow(<App />);

    // THEN
    expect(app.find(Router)).toHaveLength(1);
});
