import React from 'react';
import {shallow} from 'enzyme';

import Library from './Library';
import Book from './library/Book';

test('should fetch data from server', () => {
    // GIVEN
    jest.spyOn(global, 'fetch')
        .mockImplementation(() => Promise.resolve({json: () => {}}));

    // WHEN
    shallow(<Library />);

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
    const library = shallow(<Library />);

    // THEN
    return Promise
        .resolve(library)
        .then(() => library.update())
        .then(() => {
            expect(library.state('books'))
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
    const library = shallow(<Library />);

    // THEN
    return Promise
        .resolve(library)
        .then(() => library.update())
        .then(() => {
            expect(library.state('books')).toEqual([]);
            expect(errorMessage).toEqual('fetch books failed with error Failed.');
        });
});

test('should render single div', () => {
    // GIVEN

    // WHEN
    const library = shallow(<Library />);

    // THEN
    expect(library.is('div')).toBe(true);
});

test('should render books size times Book component', () => {
    // GIVEN
    const library = shallow(<Library />);

    // WHEN
    library.setState({books: [1, 2, 3]});

    // THEN
    expect(library.find(Book)).toHaveLength(3);
});
