import Library from './Library';
import cartService from './library/Cart.service';

class Cart extends Library {
    constructor(props) {
        super(props);
        cartService.watchCart(this);
        this.state = {
            cart: cartService.getCart(),
            books: this.state.books
        };
    }

    componentWillUnmount() {
        cartService.unwatchCart(this);
    }

    filterBooks(books) {
        const cart = this.state.cart || [];
        return (books || []).filter((book) => {
            const id = book.isbn;
            return cart.indexOf(id) > -1;
        });
    }
}

export default Cart;
