import React from 'react';
import {shallow} from 'enzyme';
import {Switch, Route} from 'react-router-dom';

import Router from './Router';
import Home from '../views/Home';
import Library from '../views/Library';
import Basket from '../views/Basket';

test('should render single Switch', () => {
    // GIVEN

    // WHEN
    const router = shallow(<Router />);

    // THEN
    expect(router.find(Switch)).toHaveLength(1);
});

test('should render single Switch', () => {
    // GIVEN

    // WHEN
    const router = shallow(<Router />);

    // THEN
    expect(router.find(Switch)).toHaveLength(1);
});

test('should have 3 correct Routes', () => {
    // GIVEN

    // WHEN
    const router = shallow(<Router />);

    // THEN
    expect(router.find(Route)).toHaveLength(3);
    expect(router.find(Route).get(0).props).toHaveProperty('exact', true);
    expect(router.find(Route).get(0).props).toHaveProperty('path', '/');
    expect(router.find(Route).get(1).props).toHaveProperty('path', '/library');
    expect(router.find(Route).get(2).props).toHaveProperty('path', '/basket');
});

test('should have single Home component', () => {
    // GIVEN

    // WHEN
    const router = shallow(<Router />);

    // THEN
    expect(router.find(Home)).toHaveLength(1);
});

test('should have single Library component', () => {
    // GIVEN

    // WHEN
    const router = shallow(<Router />);

    // THEN
    expect(router.find(Library)).toHaveLength(1);
});

test('should have single Basket component', () => {
    // GIVEN

    // WHEN
    const router = shallow(<Router />);

    // THEN
    expect(router.find(Basket)).toHaveLength(1);
});
