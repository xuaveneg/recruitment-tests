import React from 'react';
import {shallow} from 'enzyme';

import App from './App';
import Header from './layout/Header';
import Nav from './layout/Nav';
import Footer from './layout/Footer';

test('should render layout with header', () => {
    // GIVEN

    // WHEN
    const app = shallow(<App />);

    // THEN
    expect(app.find(Header)).to.have.lengthOf(1);
});

test('should render layout with nav', () => {
    // GIVEN

    // WHEN
    const app = shallow(<App />);

    // THEN
    expect(app.find(Nav)).to.have.lengthOf(1);
});

test('should render layout with footer', () => {
    // GIVEN

    // WHEN
    const app = shallow(<App />);

    // THEN
    expect(app.find(Footer)).to.have.lengthOf(1);
});
