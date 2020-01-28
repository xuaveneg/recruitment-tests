import React from 'react';
import {shallow} from 'enzyme';

import Synopsis from './Synopsis';

test('should display single synopsis paragraph', () => {
    // GIVEN

    // WHEN
    const synopsis = shallow(<Synopsis synopsis={['test']} onClick={() => {}} />);

    // THEN
    expect(synopsis.find('p')).toHaveLength(1);
    expect(synopsis.find('p').at(0).text()).toEqual('test');
});

test('should display wrapper div synopsis paragraph', () => {
    // GIVEN

    // WHEN
    const synopsis = shallow(<Synopsis synopsis={['test']} onClick={() => {}} />);

    // THEN
    expect(synopsis.find('div.synopsis')).toHaveLength(1);
});

test('should display 2 divs in wrapper div synopsis paragraph', () => {
    // GIVEN

    // WHEN
    const synopsis = shallow(<Synopsis synopsis={['test']} onClick={() => {}} />);

    // THEN
    expect(synopsis.find('div.synopsis > div')).toHaveLength(2);
});

test('should display synopsis paragraphs', () => {
    // GIVEN

    // WHEN
    const synopsis = shallow(<Synopsis synopsis={['test1', 'test2', 'test3']} onClick={() => {}} />);

    // THEN
    expect(synopsis.find('p')).toHaveLength(3);
    expect(synopsis.find('p').at(0).text()).toEqual('test1');
    expect(synopsis.find('p').at(1).text()).toEqual('test2');
    expect(synopsis.find('p').at(2).text()).toEqual('test3');
});