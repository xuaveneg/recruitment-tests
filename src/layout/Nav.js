import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';

function Nav() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Accueil</Link>
                    </li>
                    <li>
                        <Link to="/library">Inventaire</Link>
                    </li>
                    <li>
                        <Link to="/basket">Panier</Link>
                    </li>
                </ul>
            </div>
        </Router>
    );
}

export default Nav;
