import React from 'react';
import {render} from 'enzyme';

import Header from './Header';

test('should have correct text', () => {
    // GIVEN

    // WHEN
    const header = render(<Header />);

    // THEN
    expect(header.text()).toEqual('Bibliothèque d\'Henri Potier');
});

test('should be h2', () => {
    // GIVEN

    // WHEN
    const header = render(<Header />);

    // THEN
    expect(header.is('h2')).toBe(true);
});