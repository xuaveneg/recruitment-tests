import offerService from './Offer.service';

class Cart {
    constructor() {
        this.watchers = [];
        this.price = +localStorage.getItem('price') || 0;
        const storageCart = localStorage.getItem('cart');
        try {
            const parsedCart = JSON.parse(storageCart);
            this.cart = Array.isArray(parsedCart) ? parsedCart : [];
        } catch (SyntaxError) {
            this.cart = [];
        }
    }

    watchCart(component) {
        if (this.watchers.indexOf(component) === -1) {
            this.watchers.push(component);
        }
        this.updateWatchers(false);
    }

    unwatchCart(component) {
        if (this.watchers.indexOf(component) > -1) {
            this.watchers = this.watchers.filter(watcher => watcher !== component);
        }
    }

    updateWatchersState(discount) {
        this.watchers.forEach(watcher => {
            watcher.setState({
                cart: this.cart,
                price: this.price,
                discount: discount
            });
        });
    }

    updateWatchers(canUpdateSyncState = true) {
        if (this.cart.length > 0) {
            offerService.retrieveData(this.cart.join(','), this.price)
                .then((discount) => this.updateWatchersState(discount))
        } else if (canUpdateSyncState) {
            this.updateWatchersState({discountPrice: 0});
        }
    }

    updateData() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        localStorage.setItem('price', this.price);
        this.updateWatchers();
    }

    addToCart(id, price) {
        if (this.cart.indexOf(id) === -1) {
            this.cart.push(id);
            this.price = this.price + price;
            this.updateData();
        }
    };

    removeFromCart(id, price) {
        const newCart = this.cart.filter((cartId) => id !== cartId);
        if (newCart.length !== this.cart.length) {
            this.cart = newCart;
            this.price = Math.max(0, this.price - price);
            this.updateData();
        }
    };
}

export default new Cart();
