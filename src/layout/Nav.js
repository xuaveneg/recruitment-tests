import React from 'react';
import {Link} from 'react-router-dom';

function Nav() {
    return (
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
    );
}

export default Nav;
