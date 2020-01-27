import React from 'react';
import {shallow} from 'enzyme';
import {Link} from 'react-router-dom';

import Home from './Home';

test('should have 2 divs', () => {
    // GIVEN

    // WHEN
    const home = shallow(<Home />);

    // THEN
    expect(home.find('div')).toHaveLength(3);
});

test('should have 2 correct links', () => {
    // GIVEN

    // WHEN
    const home = shallow(<Home />);

    // THEN
    expect(home.find(Link)).toHaveLength(2);
    expect(home.find(Link).get(0).props).toHaveProperty('to', '/library');
    expect(home.find(Link).get(1).props).toHaveProperty('to', '/cart');
});
