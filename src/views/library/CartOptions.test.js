import React from 'react';
import {shallow} from 'enzyme';
import {Switch, Route} from 'react-router-dom';

import CartOptions from './CartOptions';

test('should be Switch', () => {
    // GIVEN

    // WHEN
    const cartOptions = shallow(<CartOptions id={'test1'} />);

    // THEN
    expect(cartOptions.is(Switch)).toBe(true);
});

test('should have 2 Routes', () => {
    // GIVEN

    // WHEN
    const cartOptions = shallow(<CartOptions id={'test2'} />);

    // THEN
    expect(cartOptions.find(Route)).toHaveLength(2);
    expect(cartOptions.find(Route).get(0).props).toHaveProperty('path', '/library');
    expect(cartOptions.find(Route).get(1).props).toHaveProperty('path', '/basket');
});

test('should have 2 divs', () => {
    // GIVEN

    // WHEN
    const cartOptions = shallow(<CartOptions id={'test3'} />);

    // THEN
    expect(cartOptions.find('div')).toHaveLength(2);
    expect(cartOptions.find('div').at(0).text()).toEqual('Ajouter au panier');
    expect(cartOptions.find('div').at(1).text()).toEqual('Retirer du panier');
});
