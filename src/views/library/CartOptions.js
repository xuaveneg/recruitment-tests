import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import cartService from './Cart.service';

function CartOptions({id, price}) {
    return (
        <Switch>
            <Route path="/library">
                <div onClick={() => cartService.addToCart(id, price)}>Ajouter au panier</div>
            </Route>
            <Route path="/cart">
                <div onClick={() => cartService.removeFromCart(id, price)}>Retirer du panier</div>
            </Route>
        </Switch>
    );
}

CartOptions.propTypes = {
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
};

export default CartOptions;
