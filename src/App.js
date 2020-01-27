import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Nav from './layout/Nav';
import AppRouter from './layout/Router';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Header />
            </header>
            <nav>
                <Nav />
            </nav>
            <article>
                <AppRouter />
            </article>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default App;
