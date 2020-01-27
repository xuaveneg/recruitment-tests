import React from 'react';
import PropTypes from 'prop-types';

import CartOptions from './CartOptions';

function Book({book}) {
    return (
        <div>
            {book.title && <h2>{book.title}</h2>}
            {book.cover && <img src={book.cover} alt={book.title || book.cover}/>}
            {book.isbn && <div>{book.isbn}</div>}
            {book.price && <div>{book.price}</div>}
            {(book.synopsis || [])
                .map((synopsisParagraph, index) => (
                    <p key={index}>{synopsisParagraph}</p>
            ))}
            {book.isbn && <CartOptions id={book.isbn} />}
        </div>
    );
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
