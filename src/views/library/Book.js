import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CartOptions from './CartOptions';

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
            <div onClick={() => this.setState({showSynopsis: true})}>
                {book.title && <h2>{book.title}</h2>}
                {book.cover && <img src={book.cover} alt={book.title || book.cover}/>}
                {book.isbn && <div>Référence : {book.isbn}</div>}
                {book.price && <div>Prix : {book.price}</div>}
                {book.synopsis && showSynopsis &&
                    <div onClick={() => this.setState({showSynopsis: false})}>
                        {(book.synopsis || [])
                            .map((synopsisParagraph, index) => (
                                <p key={index}>{synopsisParagraph}</p>
                        ))}
                    </div>
                }
                {book.isbn && <CartOptions id={book.isbn} />}
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
