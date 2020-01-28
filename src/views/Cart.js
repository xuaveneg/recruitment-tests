import React from 'react';

import Library from './Library';
import cartService from './library/Cart.service';

class Cart extends Library {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            price: 0,
            discount: {
                discountPrice: 0
            },
            books: this.state.books
        };
        cartService.watchCart(this);
    }

    componentWillUnmount() {
        cartService.unwatchCart(this);
    }

    filterBooks(books) {
        const {cart} = this.state;
        return (books || []).filter((book) => {
            const id = book.isbn;
            return cart.indexOf(id) > -1;
        });
    }

    displayOfferString(offer) {
        switch (offer.type) {
            case 'percentage':
                return '%';
            case 'minus':
                return '€';
            case 'slice':
                return '€ par tranche de ' + offer.sliceValue.toFixed(2) + '€';
            default:
                return '?';
        }
    }

    renderOffer(discount) {
        const {offer} = discount;
        return (
            <div>
                <div>Réduction de {offer.value.toFixed(2)}{this.displayOfferString(offer)}</div>
                <div>Prix réduit : {discount.discountPrice.toFixed(2)}€</div>
            </div>
        );
    }

    renderAdditionalData() {
        const {discount, price} = this.state;
        return (
            <div>
                <div>Prix total : {price.toFixed(2)}€</div>
                {discount.offer && this.renderOffer(discount)}
            </div>
        );
    }
}

export default Cart;
