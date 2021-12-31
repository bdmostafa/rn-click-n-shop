import moment from "moment";

class Order {
  constructor(id, items, totalAmountOfCart, date) {
    this.id = id;
    this.items = items;
    this.totalAmountOfCart = totalAmountOfCart;
    this.date = date;
  }

  get readableDate() {
    // This works only for IOS
    // return this.date.toLocaleDateString('en-EN', {
    //   year: 'numeric',
    //   month: 'long',
    //   day: 'numeric',
    //   hour: '2-digit',
    //   minute: '2-digit'
    // });

    // To solve android and ios use moment library
    return moment(this.date).format("MMMM Do YYYY, hh:mm");
  }
}

export default Order;
