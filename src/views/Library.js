import React, {Component} from 'react';

import Book from './library/Book';

class Library extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }

    filterBooks(books) {
        return books;
    }

    componentDidMount() {
        fetch('http://henri-potier.xebia.fr/books')
            .then((response) => response.json())
            .then((json) => {
                this.setState({books: this.filterBooks(json)});
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

export default Library;
