import React, {Component} from 'react';

import Book from './library/Book';
import {getCart} from './library/Cart.service';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }

    componentDidMount() {
        fetch('http://henri-potier.xebia.fr/books')
            .then((response) => response.json())
            .then((json) => {
                this.setState({books: json.filter((book) => getCart().indexOf(book.isbn) > -1)});
            }, (error) => {
                console.error('fetch books failed with error ' + error.message);
            });
    }

    render () {
        return (
            <div>
                {((this.state || {})
                    .books || [])
                    .map((book, index) => (
                        <Book book={book} key={index} />
                ))}
            </div>
        );
    }
}

export default Cart;
