class Offer {
    computePercentage(price, value) {
        return +price * (100 - +value) / 100;
    }

    computeMinus(price, value) {
        return +price - +value;
    }

    computeSlice(price, value, sliceValue) {
        return +price - +value * Math.floor(+price / +sliceValue);
    }

    handleCommercialOffersResponse(price, offers) {
        return offers.reduce((discounted, offer) => {
            let discountPrice = discounted.discountPrice;
            switch (offer.type) {
                case 'percentage':
                    discountPrice = this.computePercentage(price, offer.value);
                    break;
                case 'minus':
                    discountPrice = this.computeMinus(price, offer.value);
                    break;
                case 'slice':
                    discountPrice = this.computeSlice(price, offer.value, offer.sliceValue);
                    break
                default:
                    discountPrice = price;
                    break;
            }
            if (discounted.discountPrice > discountPrice) {
                return {discountPrice: discountPrice, offer: offer};
            }
            return discounted;
        }, {discountPrice: price});
    }

    retrieveData(inputIsbn, price) {
        return fetch("http://henri-potier.xebia.fr/books/"+inputIsbn+"/commercialOffers")
            .then(response => response.json())
            .then(json => this.handleCommercialOffersResponse(price, json.offers))
    }
}

export default new Offer();
