import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from '../views/Home';
import Library from '../views/Library';
import Basket from '../views/Basket';

function Router() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/library">
                <Library />
            </Route>
            <Route path="/basket">
                <Basket />
            </Route>
        </Switch>
    );
}

export default Router;
