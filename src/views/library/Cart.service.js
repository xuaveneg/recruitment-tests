class Cart {
    constructor() {
        this.watchers = [];
    }

    watchCart(component) {
        if (this.watchers.indexOf(component) === -1) {
            this.watchers.push(component);
        }
    }

    unwatchCart(component) {
        if (this.watchers.indexOf(component) > -1) {
            this.watchers = this.watchers.filter(watcher => watcher != component);
        }
    }

    updateWatchers(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        this.watchers.forEach(watcher => {
            watcher.setState({cart: cart});
        });
    }

    addToCart(id) {
        const cart = this.getCart();
        if (cart.indexOf(id) === -1) {
            cart.push(id);
            this.updateWatchers(cart);
        }
    };

    removeFromCart(id) {
        const oldCart = this.getCart();
        const cart = oldCart.filter((cartId) => id != cartId);
        if (cart.length != oldCart.length) {
            this.updateWatchers(cart);
        }
    };

    getCart() {
        let cart = localStorage.getItem('cart');
        try {
           cart = JSON.parse(cart);
            return Array.isArray(cart) ? cart : [];
        } catch (SyntaxError) {
            return [];
        }
    };
}

export default new Cart();
