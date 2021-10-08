class Auctioneer {
    constructor() {
        //define constructor here
        this.bidderList = [];
    }
    //write code here
    registerBidder(bidder) {
        this.bidder.push(bidder);
    }
    announceNewBidderPrice() {
        this.notifyBidders();
    }
    notifyBidders() {
        this.bidderList.forEach(bidder => bidder.update());
    }
}


class Bidder {
    constructor(name) {
        //define constructor here
        this.name = name;
        this.bidPrice = null;
    }
    //write code here 
    update() {
        console.log(`${this.name} is offering ${this.bidPrice} dollars`);
        if (this.bidPrice > 500) {
            console.log(`Sold to ${this.name}`);
        }
    }
    giveNewPrice(price) {
        this.bidPrice = price;
    }
}