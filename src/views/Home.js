import React from 'react';
import {Link} from 'react-router-dom';

function Home() {
    return (
        <div>
            <div>
                Bienvenue sur le site de la Bibliothèque d'Henri Potier.
            </div>
            <div>
                Vous pourrez ici avoir <Link to='/library'>l'inventaire</Link> des livres de la bibliothèque
                et les ajouter à <Link to='/cart'>votre panier</Link>.
            </div>
        </div>
    );
}

export default Home;
