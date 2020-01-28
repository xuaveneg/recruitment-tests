import cartService from './Cart.service';

import offerService from './Offer.service';

test('should add to cart', () => {
    // GIVEN
    localStorage.removeItem('cart');
    localStorage.removeItem('price');

    // WHEN
    cartService.addToCart('test1', 6);

    // THEN
    expect(cartService.cart).toEqual(['test1']);
    expect(cartService.price).toEqual(6);
    expect(localStorage.getItem('cart')).toEqual('["test1"]');
    expect(localStorage.getItem('price')).toEqual('6');
});

test('should remove from cart', () => {
    // GIVEN
    cartService.removeFromCart('test1', 6);
    cartService.addToCart('test2', 7);
    localStorage.removeItem('cart');
    localStorage.removeItem('price');

    // WHEN
    cartService.removeFromCart('test2', 7);

    // THEN
    expect(cartService.cart).toEqual([]);
    expect(cartService.price).toEqual(0);
    expect(localStorage.getItem('cart')).toEqual('[]');
    expect(localStorage.getItem('price')).toEqual('0');
});

test('should not add to cart if already in it', () => {
    // GIVEN
    cartService.addToCart('test1', 6);
    localStorage.removeItem('cart');
    localStorage.removeItem('price');

    // WHEN
    cartService.addToCart('test1', 6);

    // THEN
    expect(cartService.cart).toEqual(['test1']);
    expect(cartService.price).toEqual(6);
    expect(localStorage.getItem('cart')).toBeNull();
    expect(localStorage.getItem('price')).toBeNull();
});

test('should not remove from cart if not in it', () => {
    // GIVEN
    cartService.addToCart('test1', 6);
    localStorage.removeItem('cart');
    localStorage.removeItem('price');

    // WHEN
    cartService.removeFromCart('test2', 7);

    // THEN
    expect(cartService.cart).toEqual(['test1']);
    expect(cartService.price).toEqual(6);
    expect(localStorage.getItem('cart')).toBeNull();
    expect(localStorage.getItem('price')).toBeNull();
});

test('should update localStorage on updateData', () => {
    // GIVEN
    cartService.cart = ['test1', 'test2'];
    cartService.price = 15;
    localStorage.removeItem('cart');
    localStorage.removeItem('price');

    // WHEN
    cartService.updateData();

    // THEN
    expect(localStorage.getItem('cart')).toEqual('["test1","test2"]');
    expect(localStorage.getItem('price')).toEqual('15');
});

let state1, state2;
const component1 = {
    setState: (state) => {
        state1 = state;
    }
};
const component2 = {
    setState: (state) => {
        state2 = state;
        return 0;
    }
};

test('should add not already added watcher', () => {
    // GIVEN

    // WHEN
    cartService.watchCart(component1);

    // THEN
    expect(cartService.watchers).toEqual([component1]);
});

test('should not add already added watcher', () => {
    // GIVEN
    cartService.watchCart(component1);
    cartService.watchCart(component1);

    // WHEN
    cartService.watchCart(component1);

    // THEN
    expect(cartService.watchers).toEqual([component1]);
});

test('should add 2 different watchers', () => {
    // GIVEN

    // WHEN
    cartService.watchCart(component1);
    cartService.watchCart(component2);

    // THEN
    expect(cartService.watchers).toEqual([component1, component2]);
});

test('should remove already added watcher', () => {
    // GIVEN
    cartService.watchCart(component1);
    cartService.watchCart(component2);

    // WHEN
    cartService.unwatchCart(component1);

    // THEN
    expect(cartService.watchers).toEqual([component2]);
});

test('should not remove already removed watcher', () => {
    // GIVEN
    cartService.watchCart(component1);
    cartService.watchCart(component2);
    cartService.unwatchCart(component1);

    // WHEN
    cartService.unwatchCart(component1);

    // THEN
    expect(cartService.watchers).toEqual([component2]);
});

test('should remove 2 different watchers', () => {
    // GIVEN
    cartService.watchCart(component1);
    cartService.watchCart(component2);

    // WHEN
    cartService.unwatchCart(component1);
    cartService.unwatchCart(component2);

    // THEN
    expect(cartService.watchers).toEqual([]);
});

test('should update all watchers state', () => {
    // GIVEN
    cartService.watchCart(component1);
    cartService.watchCart(component2);
    cartService.cart = ['test1', 'test2'];
    cartService.price = 42;
    state1 = undefined;
    state2 = undefined;

    // WHEN
    cartService.updateWatchersState({test: 'test'});

    // THEN
    expect(state1).toEqual({
        cart: ['test1', 'test2'],
        price: 42,
        discount: {test: 'test'}
    });
    expect(state2).toEqual({
        cart: ['test1', 'test2'],
        price: 42,
        discount: {test: 'test'}
    });
});

test('should not update watcher', () => {
    // GIVEN
    cartService.watchCart(component1);
    cartService.cart = [];
    cartService.price = 42;
    state1 = undefined;

    // WHEN
    cartService.updateWatchers(false);

    // THEN
    expect(state1).toBeUndefined();
});

test('should update watcher sync', () => {
    // GIVEN
    cartService.watchCart(component1);
    cartService.cart = [];
    cartService.price = 42;
    state1 = undefined;

    // WHEN
    cartService.updateWatchers(true);

    // THEN
    expect(state1).toEqual({
        cart: [],
        price: 42,
        discount: {discountPrice: 0}
    });
});

test('should update watcher with non empty cart', () => {
    // GIVEN
    cartService.watchCart(component1);
    cartService.cart = ['test1', 'test2'];
    cartService.price = 42;
    state1 = undefined;
    offerService.retrieveData = (ids, price) => Promise.resolve({ids: ids, price: price});

    // WHEN
    cartService.updateWatchers();

    // THEN
    Promise.resolve(cartService).then(() => {
        expect(state1).toEqual({
            cart: ['test1', 'test2'],
            price: 42,
            discount: {ids: 'test1,test2', price: 42}
        });
    });
});
