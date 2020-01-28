import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CartOptions from './CartOptions';
import Synopsis from './Synopsis';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSynopsis: false
        };
    }

    render() {
        const {book} = this.props;
        const {showSynopsis} = this.state;
        return (
            <div className='book'>
                {book.title &&
                    <h2
                        title='Avoir plus de détails'
                        onClick={() => this.setState({showSynopsis: true})}
                    >{book.title}</h2>}
                {book.cover &&
                    <img
                        src={book.cover}
                        alt={book.title || book.cover}
                        title={book.title || book.cover}
                    />}
                {book.isbn &&
                    <div
                        title='Avoir plus de détails'
                        onClick={() => this.setState({showSynopsis: true})}
                    >Référence : {book.isbn}</div>}
                {book.price && <div>Prix : {book.price.toFixed(2)}€</div>}
                {book.synopsis && showSynopsis && <Synopsis
                    onClick={() => this.setState({showSynopsis: false})}
                    synopsis={book.synopsis}
                />}
                {book.isbn && <CartOptions id={book.isbn} price={book.price || 0} />}
            </div>
        );
    };
}

Book.propTypes = {
    book: PropTypes.shape({
        title: PropTypes.string,
        cover: PropTypes.string,
        isbn: PropTypes.string.isRequired,
        price: PropTypes.number,
        synopsis: PropTypes.arrayOf(
            PropTypes.string
        )
    }).isRequired
};

export default Book;
