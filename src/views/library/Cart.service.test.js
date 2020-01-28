import cartService from './Cart.service';

test('should have empty cart at initialization', () => {
    // GIVEN
    localStorage.removeItem('cart');

    // WHEN
    const cart = cartService.getCart();

    // THEN
    expect(cart).toEqual([]);
});

test('should have empty cart when localStorage does not have array (null)', () => {
    // GIVEN
    localStorage.removeItem('cart');
    localStorage.setItem('cart', null);

    // WHEN
    const cart = cartService.getCart();

    // THEN
    expect(cart).toEqual([]);
});

test('should have empty cart when localStorage does not have array (undefined)', () => {
    // GIVEN
    localStorage.removeItem('cart');
    localStorage.setItem('cart', undefined);

    // WHEN
    const cart = cartService.getCart();

    // THEN
    expect(cart).toEqual([]);
});

test('should have empty cart when localStorage does not have array', () => {
    // GIVEN
    localStorage.removeItem('cart');
    localStorage.setItem('cart', 15);

    // WHEN
    const cart = cartService.getCart();

    // THEN
    expect(cart).toEqual([]);
});

test('should have cart from localStorage', () => {
    // GIVEN
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(['test1']));

    // WHEN
    const cart = cartService.getCart();

    // THEN
    expect(cart).toEqual(['test1']);
});

test('should have other cart from localStorage', () => {
    // GIVEN
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(['test2', 'test3']));

    // WHEN
    const cart = cartService.getCart();

    // THEN
    expect(cart).toEqual(['test2', 'test3']);
});

test('should initialize localStorage cart on first add', () => {
    // GIVEN
    localStorage.removeItem('cart');

    // WHEN
    cartService.addToCart('test1');

    // THEN
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual(['test1']);
});

test('should add in cart', () => {
    // GIVEN
    localStorage.removeItem('cart');

    // WHEN
    cartService.addToCart('test1');
    cartService.addToCart('test2');

    // THEN
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual(['test1', 'test2']);
});

test('should remove last added from cart', () => {
    // GIVEN
    localStorage.removeItem('cart');

    // WHEN
    cartService.addToCart('test1');
    cartService.addToCart('test2');
    cartService.removeFromCart('test2');

    // THEN
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual(['test1']);
});

test('should remove first added from cart', () => {
    // GIVEN
    localStorage.removeItem('cart');

    // WHEN
    cartService.addToCart('test1');
    cartService.addToCart('test2');
    cartService.removeFromCart('test1');

    // THEN
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual(['test2']);
});

test('should remove all from cart', () => {
    // GIVEN
    localStorage.removeItem('cart');

    // WHEN
    cartService.addToCart('test1');
    cartService.addToCart('test2');
    cartService.removeFromCart('test1');
    cartService.removeFromCart('test2');

    // THEN
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual([]);
});

test('should not remove id not in cart', () => {
    // GIVEN
    localStorage.removeItem('cart');

    // WHEN
    cartService.addToCart('test1');
    cartService.addToCart('test2');
    cartService.removeFromCart('test3');

    // THEN
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual(['test1', 'test2']);
});

test('should not add twice same id', () => {
    // GIVEN
    localStorage.removeItem('cart');

    // WHEN
    cartService.addToCart('test1');
    cartService.addToCart('test1');

    // THEN
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual(['test1']);
});
