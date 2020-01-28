function addToCart(id) {
    const cart = getCart();
    if (cart.indexOf(id) === -1) {
        cart.push(id);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

function removeFromCart(id) {
    const oldCart = getCart();
    const cart = oldCart.filter((cartId) => id != cartId);
    if (cart.length != oldCart.length) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

function getCart() {
    let cart = localStorage.getItem('cart');
    try {
       cart = JSON.parse(cart);
        return Array.isArray(cart) ? cart : [];
    } catch (SyntaxError) {
        return [];
    }
}

export {
    addToCart,
    removeFromCart,
    getCart
};
