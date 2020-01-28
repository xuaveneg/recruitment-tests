import React from 'react';
import {shallow} from 'enzyme';

import Book from './Book';
import CartOptions from './CartOptions';
import Synopsis from './Synopsis';

test('should be div', () => {
    // GIVEN

    // WHEN
    const book = shallow(<Book book={{isbn: 'isbnTest'}} />);

    // THEN
    expect(book.is('div')).toBe(true);
});

test('should display title', () => {
    // GIVEN

    // WHEN
    const book = shallow(<Book book={{title: 'test', isbn: 'isbnTest'}} />);

    // THEN
    expect(book.find('h2').first().text()).toEqual('test');
});

test('should display cover', () => {
    // GIVEN

    // WHEN
    const book = shallow(<Book book={{cover: 'test', isbn: 'isbnTest'}} />);

    // THEN
    expect(book.find('img').first().props()).toHaveProperty('src', 'test');
});

test('should have cover with right alt when title not defined', () => {
    // GIVEN

    // WHEN
    const book = shallow(<Book book={{cover: 'test', isbn: 'isbnTest'}} />);

    // THEN
    expect(book.find('img').first().props()).toHaveProperty('alt', 'test');
});

test('should have cover with right alt when title defined', () => {
    // GIVEN

    // WHEN
    const book = shallow(<Book book={{cover: 'test', title: 'test2', isbn: 'isbnTest'}} />);

    // THEN
    expect(book.find('img').first().props()).toHaveProperty('alt', 'test2');
});

test('should display isbn', () => {
    // GIVEN

    // WHEN
    const book = shallow(<Book book={{isbn: 'test'}} />);

    // THEN
    expect(book.find('div').at(1).text()).toEqual('Référence : test');
});

test('should display price', () => {
    // GIVEN

    // WHEN
    const book = shallow(<Book book={{price: 15, isbn: 'isbnTest'}} />);

    // THEN
    expect(book.find('div').at(2).text()).toEqual('Prix : 15.00€');
});

test('should display Synopsis Component with synopsis', () => {
    // GIVEN

    // WHEN
    const book = shallow(<Book book={{isbn: 'test', synopsis: ['test1', 'test2']}} />);
    book.setState({showSynopsis: true});

    // THEN
    expect(book.find(Synopsis)).toHaveLength(1);
    expect(book.find(Synopsis).get(0).props).toHaveProperty('synopsis', ['test1', 'test2']);
});

test('should display CartOptions Component with isbn', () => {
    // GIVEN

    // WHEN
    const book = shallow(<Book book={{isbn: 'test'}} />);

    // THEN
    expect(book.find(CartOptions)).toHaveLength(1);
    expect(book.find(CartOptions).first().props()).toHaveProperty('id', 'test');
});
