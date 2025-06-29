class OrderSummary {
  constructor() {
    this.itemsCountElement = document.getElementById("items-count");
    this.totalPriceElement = document.getElementById("total-price");
    this.bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];
    this.coffeeItems = JSON.parse(localStorage.getItem("CoffeeItems")) || [];
    this.nonCoffeeItems =
      JSON.parse(localStorage.getItem("nonCoffeeItems")) || [];

    console.log("Bag Items:", this.bagItems);
    console.log("Coffee Items:", this.coffeeItems);
    console.log("Non-Coffee Items:", this.nonCoffeeItems);
  }

  updateSummary() {
    let totalPrice = 0;
    const itemsCount = this.bagItems.length;

    this.bagItems.forEach((id) => {
      if (id < this.coffeeItems.length) {
        totalPrice += this.coffeeItems[id].price;
      } else {
        const nonCoffeeIndex = id - this.coffeeItems.length;
        totalPrice += this.nonCoffeeItems[nonCoffeeIndex].price;
      }
    });
    console.log("Total Items:", itemsCount);
    console.log("Total Price:", totalPrice);
    this.itemsCountElement.textContent = `${itemsCount} Items`;
    this.totalPriceElement.textContent = `₹${totalPrice}`;
  }
}
