import React from 'react';
import {render} from 'enzyme';

import Footer from './Footer';

test('should have correct text', () => {
    // GIVEN

    // WHEN
    const footer = render(<Footer />);

    // THEN
    expect(footer.text()).toEqual('Fait par Benoit Genevaux pour l\'entretien frontend Xebia.');
});

test('should be div', () => {
    // GIVEN

    // WHEN
    const footer = render(<Footer />);

    // THEN
    expect(footer.is('div')).toBe(true);
});