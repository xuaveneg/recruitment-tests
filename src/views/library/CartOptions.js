import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import {addToCart, removeFromCart} from './Cart.service';

function CartOptions({id}) {
    return (
        <Switch>
            <Route path="/library">
                <div onclick={() => addToCart(id)}>Ajouter au panier</div>
            </Route>
            <Route path="/cart">
                <div onclick={() => removeFromCart(id)}>Retirer du panier</div>
            </Route>
        </Switch>
    );
}

CartOptions.propTypes = {
    id: PropTypes.string.isRequired
};

export default CartOptions;
