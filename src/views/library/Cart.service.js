function addToCart(id) {
    const cart = getCart();
    cart.push(id);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter((cartId) => id != cartId);
    localStorage.setItem('cart', JSON.stringify(cart));
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
