import React from 'react';
import {shallow} from 'enzyme';

import Cart from './Cart';
import Book from './library/Book';

test('should fetch data from server', () => {
    // GIVEN
    jest.spyOn(global, 'fetch')
        .mockImplementation(() => Promise.resolve({json: () => {}}));

    // WHEN
    shallow(<Cart />);

    // THEN
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('http://henri-potier.xebia.fr/books');
});

test('should put data from server on books state on success', () => {
    // GIVEN
    jest.spyOn(global, 'fetch')
        .mockImplementation(() => Promise.resolve({json: () => [
            {isbn: 'test1'},
            {isbn: 'test2'}
        ]}));

    // WHEN
    const cart = shallow(<Cart />);

    // THEN
    return Promise
        .resolve(cart)
        .then(() => cart.update())
        .then(() => {
            expect(cart.state('books'))
                .toEqual([
                    {isbn: 'test1'},
                    {isbn: 'test2'}
                ]);
        })
});

test('should log error when server fails on books retrieval', () => {
    // GIVEN
    let errorMessage;
    jest.spyOn(global, 'fetch')
        .mockImplementation(() => Promise.reject({message: 'Failed.'}));
    jest.spyOn(console, 'error')
        .mockImplementation((message) => {
            errorMessage = message
        });

    // WHEN
    const cart = shallow(<Cart />);

    // THEN
    return Promise
        .resolve(cart)
        .then(() => cart.update())
        .then(() => {
            expect(cart.state('books')).toEqual([]);
            expect(errorMessage).toEqual('fetch books failed with error Failed.');
        });
});

test('should render single div', () => {
    // GIVEN

    // WHEN
    const cart = shallow(<Cart />);

    // THEN
    expect(cart.is('div')).toBe(true);
});

test('should render books in cart size times Book component', () => {
    // GIVEN
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(['test1', 'test2', 'test3']));
    const cart = shallow(<Cart />);

    // WHEN
    cart.setState({books: [
        {isbn: 'test1'},
        {isbn: 'test2'},
        {isbn: 'test3'}
    ]});

    // THEN
    expect(cart.find(Book)).toHaveLength(3);
});

test('should not render books in cart not in library in Book component', () => {
    // GIVEN
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(['test1', 'test2', 'test3']));
    const cart = shallow(<Cart />);

    // WHEN
    cart.setState({books: [
        {isbn: 'test1'},
        {isbn: 'test2'}
    ]});

    // THEN
    expect(cart.find(Book)).toHaveLength(2);
});

test('should not render books in library not in cart in Book component', () => {
    // GIVEN
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(['test1']));
    const cart = shallow(<Cart />);

    // WHEN
    cart.setState({books: [
        {isbn: 'test1'},
        {isbn: 'test2'}
    ]});

    // THEN
    expect(cart.find(Book)).toHaveLength(1);
});

test('should not render books when cart is empty', () => {
    // GIVEN
    localStorage.removeItem('cart');
    const cart = shallow(<Cart />);

    // WHEN
    cart.setState({books: [
        {isbn: 'test1'},
        {isbn: 'test2'}
    ]});

    // THEN
    expect(cart.find(Book)).toHaveLength(0);
});
