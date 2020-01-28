import React from 'react';
import {shallow} from 'enzyme';
import {Link} from 'react-router-dom';

import Nav from './Nav';
import cartService from '../views/library/Cart.service';

test('should render 3 correct links', () => {
    // GIVEN

    // WHEN
    const nav = shallow(<Nav />);

    // THEN
    expect(nav.find(Link)).toHaveLength(3);
    expect(nav.find(Link).get(0).props).toHaveProperty('to', '/');
    expect(nav.find(Link).get(1).props).toHaveProperty('to', '/library');
    expect(nav.find(Link).get(2).props).toHaveProperty('to', '/cart');
});

test('should have single div', () => {
    // GIVEN

    // WHEN
    const nav = shallow(<Nav />);

    // THEN
    expect(nav.is('div')).toBe(true);
});


test('should have two wrapped divs', () => {
    // GIVEN

    // WHEN
    const nav = shallow(<Nav />);

    // THEN
    expect(nav.find('div > div')).toHaveLength(2);
});

test('should have single ul', () => {
    // GIVEN

    // WHEN
    const nav = shallow(<Nav />);

    // THEN
    expect(nav.find('ul')).toHaveLength(1);
});

test('should have 3 li', () => {
    // GIVEN

    // WHEN
    const nav = shallow(<Nav />);

    // THEN
    expect(nav.find('li')).toHaveLength(3);
});

test('should watch Cart service', () => {
    // GIVEN
    cartService.watchers = [];

    // WHEN
    const nav = shallow(<Nav />);

    // THEN
    expect(cartService.watchers).toHaveLength(1);
});
