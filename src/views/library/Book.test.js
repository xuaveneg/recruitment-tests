import React from 'react';
import {shallow} from 'enzyme';

import Book from './Book';
import CartOptions from './CartOptions';

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
    expect(book.find('div').at(1).text()).toEqual('test');
});

test('should display price', () => {
    // GIVEN

    // WHEN
    const book = shallow(<Book book={{price: 15, isbn: 'isbnTest'}} />);

    // THEN
    expect(book.find('div').at(2).text()).toEqual('15');
});

test('should display single synopsis paragraph', () => {
    // GIVEN

    // WHEN
    const book = shallow(<Book book={{synopsis: ['test'], isbn: 'isbnTest'}} />);

    // THEN
    expect(book.find('p')).toHaveLength(1);
    expect(book.find('p').at(0).text()).toEqual('test');
});

test('should display synopsis paragraphs', () => {
    // GIVEN

    // WHEN
    const book = shallow(<Book book={{synopsis: ['test1', 'test2', 'test3'], isbn: 'isbnTest'}} />);

    // THEN
    expect(book.find('p')).toHaveLength(3);
    expect(book.find('p').at(0).text()).toEqual('test1');
    expect(book.find('p').at(1).text()).toEqual('test2');
    expect(book.find('p').at(2).text()).toEqual('test3');
});

test('should display CartOptions Component with isbn', () => {
    // GIVEN

    // WHEN
    const book = shallow(<Book book={{isbn: 'test'}} />);

    // THEN
    expect(book.find(CartOptions)).toHaveLength(1);
    expect(book.find(CartOptions).first().props()).toHaveProperty('id', 'test');
});