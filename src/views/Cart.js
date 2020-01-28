import React, {Component} from 'react';

import Library from './Library';
import {getCart} from './library/Cart.service';

class Cart extends Library {
    filterBooks(books) {
        const cart = getCart();
        return (books || []).filter((book) => {
            const id = book.isbn;
            return cart.indexOf(id) > -1;
        });
    }
}

export default Cart;
