import React from 'react';
import {shallow} from 'enzyme';

import Cart from './Cart';
import Book from './library/Book';
import cartService from './library/Cart.service';

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

test('should render wrapper div', () => {
    // GIVEN

    // WHEN
    const cart = shallow(<Cart />);

    // THEN
    expect(cart.is('div')).toBe(true);
});

test('should render inner div', () => {
    // GIVEN

    // WHEN
    const cart = shallow(<Cart />);

    // THEN
    expect(cart.find('div.books')).toHaveLength(1);
});

test('should render books in cart size times Book component', () => {
    // GIVEN
    const cart = shallow(<Cart />);
    jest.spyOn(global, 'fetch')
        .mockImplementation(() => Promise.resolve({json: () => {}}));

    // WHEN
    cart.setState({books: [
        {isbn: 'test1'},
        {isbn: 'test2'},
        {isbn: 'test3'}
    ], cart: ['test1', 'test2', 'test3']});

    // THEN
    expect(cart.find(Book)).toHaveLength(3);
});

test('should not render books in cart not in library in Book component', () => {
    // GIVEN
    const cart = shallow(<Cart />);
    jest.spyOn(global, 'fetch')
        .mockImplementation(() => Promise.resolve({json: () => {}}));

    // WHEN
    cart.setState({books: [
        {isbn: 'test1'},
        {isbn: 'test2'}
    ], cart: ['test1', 'test2', 'test3']});

    // THEN
    expect(cart.find(Book)).toHaveLength(2);
});

test('should not render books in library not in cart in Book component', () => {
    // GIVEN
    const cart = shallow(<Cart />);
    jest.spyOn(global, 'fetch')
        .mockImplementation(() => Promise.resolve({json: () => {}}));

    // WHEN
    cart.setState({books: [
        {isbn: 'test1'},
        {isbn: 'test2'}
    ], cart: ['test1']});

    // THEN
    expect(cart.find(Book)).toHaveLength(1);
});

test('should not render books when cart is empty', () => {
    // GIVEN
    const cart = shallow(<Cart />);
    jest.spyOn(global, 'fetch')
        .mockImplementation(() => Promise.resolve({json: () => {}}));

    // WHEN
    cart.setState({books: [
        {isbn: 'test1'},
        {isbn: 'test2'}
    ], cart: []});

    // THEN
    expect(cart.find(Book)).toHaveLength(0);
});

test('should watch Cart service', () => {
    // GIVEN
    cartService.watchers = [];

    // WHEN
    shallow(<Cart />);

    // THEN
    expect(cartService.watchers).toHaveLength(1);
});

test('should render price info without offer', () => {
    // GIVEN
    const cart = shallow(<Cart />);

    // WHEN
    cart.setState({price: 15, discount: {discountPrice: 0}});

    // THEN
    expect(cart.find('div > div > div').at(0).text()).toEqual('Prix total : 15.00€');
});

test('should render offer value for percentage', () => {
    // GIVEN
    const cart = shallow(<Cart />);

    // WHEN
    cart.setState({price: 10, discount: {
        discountPrice: 4,
        offer: {
            type: 'percentage',
            value: 7
    }}});

    // THEN
    expect(cart.find('div > div > div > div').at(0).text('Réduction de 7.00%'));
});

test('should render offer value for minus', () => {
    // GIVEN
    const cart = shallow(<Cart />);

    // WHEN
    cart.setState({price: 10, discount: {
        discountPrice: 4,
        offer: {
            type: 'minus',
            value: 45
    }}});

    // THEN
    expect(cart.find('div > div > div > div').at(0).text('Réduction de 45.00€'));
});

test('should render offer value for slice', () => {
    // GIVEN
    const cart = shallow(<Cart />);

    // WHEN
    cart.setState({price: 10, discount: {
        discountPrice: 4,
        offer: {
            type: 'slice',
            value: 32,
            sliceValue: 78
    }}});

    // THEN
    expect(cart.find('div > div > div > div').at(0).text('Réduction de 32.00€ par tranche de 78.00€'));
});

test('should render offer value for unknown type', () => {
    // GIVEN
    const cart = shallow(<Cart />);

    // WHEN
    cart.setState({price: 10, discount: {
        discountPrice: 4,
        offer: {
            type: 'unknown',
            value: 17
    }}});

    // THEN
    expect(cart.find('div > div > div > div').at(0).text('Réduction de 17.00?'));
});

test('should render discount price', () => {
    // GIVEN
    const cart = shallow(<Cart />);

    // WHEN
    cart.setState({price: 64, discount: {
        discountPrice: 29,
        offer: {
            type: 'unknown',
            value: 17
    }}});

    // THEN
    expect(cart.find('div > div > div > div').at(1).text('Prix réduit : 29.00€'));
});
