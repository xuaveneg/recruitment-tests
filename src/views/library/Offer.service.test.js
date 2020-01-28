import offerService from './Offer.service';

test('should compute percentage', function() {
    // GIVEN

    // WHEN
    const percentage = offerService.computePercentage(43, 6);

    // THEN
    expect(percentage).toEqual(40.42);
});

test('should compute minus', function() {
    // GIVEN

    // WHEN
    const minus = offerService.computeMinus(43, 6);

    // THEN
    expect(minus).toEqual(37);
});

test('should compute slice', function() {
    // GIVEN

    // WHEN
    const slice = offerService.computeSlice(43, 6, 40);

    // THEN
    expect(slice).toEqual(37);
});

test('should compute slice', function() {
    // GIVEN

    // WHEN
    const slice = offerService.computeSlice(133, 6, 40);

    // THEN
    expect(slice).toEqual(115);
});

test('should compute discount for percentage', function() {
    // GIVEN

    // WHEN
    const discount = offerService.handleCommercialOffersResponse(100, [{type: 'percentage', value: 12}]);

    // THEN
    expect(discount).toEqual({discountPrice: 88, offer: {type: 'percentage', value: 12}});
});

test('should compute discount for minus', function() {
    // GIVEN

    // WHEN
    const discount = offerService.handleCommercialOffersResponse(100, [{type: 'minus', value: 11}]);

    // THEN
    expect(discount).toEqual({discountPrice: 89, offer: {type: 'minus', value: 11}});
});

test('should compute discount for slice', function() {
    // GIVEN

    // WHEN
    const discount = offerService.handleCommercialOffersResponse(100, [{type: 'slice', value: 20, sliceValue: 50}]);

    // THEN
    expect(discount).toEqual({discountPrice: 60, offer: {type: 'slice', value: 20, sliceValue: 50}});
});

test('should compute discount for unknown', function() {
    // GIVEN

    // WHEN
    const discount = offerService.handleCommercialOffersResponse(100, [{type: 'unknown', value: 20}]);

    // THEN
    expect(discount).toEqual({discountPrice: 100});
});

test('should compute most interesting discount when multiple', function() {
    // GIVEN

    // WHEN
    const discount = offerService.handleCommercialOffersResponse(100, [
        {type: 'unknown', value: 20},
        {type: 'slice', value: 20, sliceValue: 50},
        {type: 'minus', value: 11},
        {type: 'percentage', value: 12}
    ]);

    // THEN
    expect(discount).toEqual({discountPrice: 60, offer: {type: 'slice', value: 20, sliceValue: 50}});
});

test('should compute most interesting discount when multiple', function() {
    // GIVEN

    // WHEN
    const discount = offerService.handleCommercialOffersResponse(100, [
        {type: 'unknown', value: 20},
        {type: 'slice', value: 20, sliceValue: 50},
        {type: 'minus', value: 11},
        {type: 'percentage', value: 12}
    ]);

    // THEN
    expect(discount).toEqual({discountPrice: 60, offer: {type: 'slice', value: 20, sliceValue: 50}});
});

test('should call backend on data retrieval', done => {
    // GIVEN
    jest.spyOn(global, 'fetch')
        .mockImplementation(() => Promise.resolve({json: () => {
            return {offers: [
                {type: 'unknown', value: 20},
                {type: 'slice', value: 20, sliceValue: 50},
                {type: 'minus', value: 11},
                {type: 'percentage', value: 12}
            ]}
        }}));

    // WHEN
    const discount = offerService.retrieveData('a,b', 100);

    // THEN
    return discount
        .then(discount => {
            expect(discount).toEqual({discountPrice: 60, offer: {type: 'slice', value: 20, sliceValue: 50}})
            done();
        });
});