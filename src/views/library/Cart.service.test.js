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

test('should update watchers', () => {
    // GIVEN
    localStorage.removeItem('cart');
    let state;
    cartService.watchCart({setState: (value) => state = value});

    // WHEN
    cartService.addToCart('test1');

    // THEN
    expect(state).toEqual({cart: ['test1']});
});

test('should update watchers twice', () => {
    // GIVEN
    localStorage.removeItem('cart');
    let state;

    // WHEN
    cartService.addToCart('test1');
    cartService.watchCart({setState: (value) => state = value});
    cartService.addToCart('test2');

    // THEN
    expect(state).toEqual({cart: ['test1', 'test2']});
});

test('should not update watchers before watching', () => {
    // GIVEN
    localStorage.removeItem('cart');
    let state;

    // WHEN
    cartService.addToCart('test1');
    cartService.addToCart('test2');
    cartService.watchCart({setState: (value) => state = value});

    // THEN
    expect(state).toEqual(undefined);
});

test('should not update watchers after unwatching', () => {
    // GIVEN
    localStorage.removeItem('cart');
    let state;
    const component = {setState: (value) => state = value};

    // WHEN
    cartService.watchCart(component);
    cartService.addToCart('test1');
    cartService.addToCart('test2');
    cartService.unwatchCart(component);
    cartService.removeFromCart('test1');

    // THEN
    expect(state).toEqual({cart: ['test1', 'test2']});
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual(['test2']);
});

test('should watch 2 watchers', () => {
    // GIVEN
    localStorage.removeItem('cart');
    let state1, state2;
    const component1 = {setState: (value) => state1 = value};
    const component2 = {setState: (value) => state2 = value};

    // WHEN
    cartService.watchCart(component1);
    cartService.addToCart('test1');
    cartService.addToCart('test2');
    cartService.watchCart(component2);
    cartService.removeFromCart('test1');
    cartService.unwatchCart(component2);
    cartService.removeFromCart('test3');
    cartService.unwatchCart(component1);
    cartService.removeFromCart('test2');

    // THEN
    expect(state1).toEqual({cart: ['test2']});
    expect(state2).toEqual({cart: ['test2']});
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual([]);
});
