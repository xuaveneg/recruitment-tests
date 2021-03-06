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

    renderAdditionalData() {
        return null;
    }

    componentDidMount() {
        fetch('http://henri-potier.xebia.fr/books')
            .then((response) => response.json())
            .then((json) => {
                this.setState({books: json});
            }, (error) => {
                console.error('fetch books failed with error ' + error.message);
            });
    }

    render () {
        const filteredBooks = this.filterBooks(
            (
                (this.state || {})
                    .books || []
            )
        );
        return (
            <div>
                <div className='books'>
                    {filteredBooks
                        .map((book, index) => (
                            <Book book={book} key={index} />
                    ))}
                </div>
                {this.renderAdditionalData()}
            </div>
        );
    }
}

export default Library;
