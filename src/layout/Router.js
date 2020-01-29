import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from '../views/Home';
import Library from '../views/Library';
import Cart from '../views/Cart';

function Router() {
    return (
        <Switch>
            <Route exact path="/">
                <h2>Accueil</h2>
                <Home />
            </Route>
            <Route path="/library">
                <h2>Inventaire</h2>
                <Library />
            </Route>
            <Route path="/cart">
                <h2>Panier</h2>
                <Cart />
            </Route>
        </Switch>
    );
}

export default Router;
