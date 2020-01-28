import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import cartService from '../views/library/Cart.service';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            discount: {
                discountPrice: 0
            }
        };
        cartService.watchCart(this);
    }

    componentWillUnmount() {
        cartService.unwatchCart(this);
    }

    render() {
        const {cart, discount} = this.state;
        return (
            <div>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Accueil</Link>
                        </li>
                        <li>
                            <Link to="/library">Inventaire</Link>
                        </li>
                        <li>
                            <Link to="/cart">Panier ({cart.length})</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    Prix : {discount.discountPrice.toFixed(2)}€
                </div>
            </div>
        );
    }
}

export default Nav;
