import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from '../views/Home';
import Library from '../views/Library';
import Cart from '../views/Cart';

function Router() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/library">
                <Library />
            </Route>
            <Route path="/cart">
                <Cart />
            </Route>
        </Switch>
    );
}

export default Router;
