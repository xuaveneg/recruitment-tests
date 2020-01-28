import React from 'react';
import './App.scss';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Nav from './layout/Nav';
import AppRouter from './layout/Router';

function App() {
    return (
        <div className="App">
            <header>
                <Header />
            </header>
            <Router>
                <nav>
                    <Nav />
                </nav>
                <article>
                    <AppRouter />
                </article>
            </Router>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default App;
