let coffeeItems = JSON.parse(localStorage.getItem("CoffeeItems"));
let noncoffeeItems = JSON.parse(localStorage.getItem("nonCoffeeItems"));
const allItems = [...coffeeItems, ...noncoffeeItems];

let bagItemsStr = localStorage.getItem("bagItems");
let bagItems = JSON.parse(bagItemsStr) || [];
let price = 0;
displayBagCount();
displayBagItems();
displayPrice();

function displayBagCount() {
  let bagItemCountElement = document.querySelector("#noOfItems");
  if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = "visible";
    bagItemCountElement.innerText = bagItems.length;
  } else {
    bagItemCountElement.style.visibility = "hidden";
  }
}

function displayBagItems() {
  let innerHtml = ``;
  let bagItemsElements = document.querySelector(".bagItems");

  // Create an object to track the total quantities for each item
  let itemQuantities = {};

  // Calculate the total quantities of each item
  bagItems.forEach((id) => {
    if (!itemQuantities[id]) {
      itemQuantities[id] = 1; // Initialize quantity
    } else {
      itemQuantities[id] += 1; // Increment quantity if already counted
    }
  });

  // Display each item only once with the correct quantity
  for (let id in itemQuantities) {
    if (id < coffeeItems.length) {
      let x = coffeeItems[id];
      if (x) {
        // Check if x exists
        innerHtml += `
            <div class="bag">
                <div class="BagImage">
                    <img src="${x.item_image}" alt="${x.alt_image_name}" />
                </div>
                <div class="itemDetails">
                    <h3>${x.item_name}</h3>
                    <p class="idNum">Item Id: ${x.itemId}</p>
                    <p class="soldBy">Sold by: Navya</p>
                    <div class="selectors">
                        <button class="decrement" data-id="${id}">-</button>
                        <span class="quantityDisplay" id="quantity-${id}">${itemQuantities[id]}</span>
                        <button class="increment" data-id="${id}">+</button>
                    </div>
                    <div class="priceDetails">
                        <span class="currentPrice">₹${x.price}</span>
                    </div>
                </div>
                <button class="clear"><b>×</b></button>
            </div>
            `;
      } else {
        console.error(`Coffee item not found for id: ${id}`);
      }
    } else {
      let nonCoffeeIndex = id - coffeeItems.length; // Adjust index for non-coffee items
      let y = noncoffeeItems[nonCoffeeIndex];
      if (y) {
        // Check if y exists
        innerHtml += `
            <div class="bag">
                <div class="BagImage">
                    <img src="${y.item_image}" alt="${y.alt_image_name}" />
                </div>
                <div class="itemDetails">
                    <h3>${y.item_name}</h3>
                    <p class="idNum">Item Id: ${y.itemId}</p>
                    <p class="soldBy">Sold by: Navya</p>
                    <div class="selectors">
                        <button class="decrement" data-id="${id}">-</button>
                        <span class="quantityDisplay" id="quantity-${id}">${itemQuantities[id]}</span>
                        <button class="increment" data-id="${id}">+</button>
                    </div>
                    <div class="priceDetails">
                        <span class="currentPrice">₹${y.price}</span>
                    </div>
                </div>
                <button class="clear"><b>×</b></button>
            </div>
            `;
      } else {
        console.error(
          `Non-coffee item not found for adjusted id: ${nonCoffeeIndex}`
        );
      }
    }
  }

  bagItemsElements.innerHTML = innerHtml;

  // Attach event listeners to all clear buttons
  const clearButtons = document.querySelectorAll(".clear");
  clearButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      removeItemFromBag(index);
    });
  });

  // Attach event listeners for increment and decrement buttons
  const decrementButtons = document.querySelectorAll(".decrement");
  const incrementButtons = document.querySelectorAll(".increment");

  decrementButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemId = event.target.dataset.id;
      updateQuantity(itemId, -1);
    });
  });

  incrementButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const itemId = event.target.dataset.id;
      updateQuantity(itemId, 1);
    });
  });
}

function updateQuantity(itemId, change) {
  const quantityDisplay = document.getElementById(`quantity-${itemId}`);
  let currentQuantity = parseInt(quantityDisplay.innerText);
  // Update quantity, ensuring it doesn't go below 1
  if (change < 0) {
    bagItems.pop();
  } else {
    bagItems.push(parseInt(itemId));
  }
  currentQuantity = Math.max(1, currentQuantity + change);
  quantityDisplay.innerText = currentQuantity;
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagCount();
  displayPrice();
}

function removeItemFromBag(index) {
  const itemId = bagItems[index];
  // Create a new array that excludes the item being removed
  bagItems = bagItems.filter((item) => item !== itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems)); // Update localStorage

  displayBagCount(); // Update the bag count
  displayBagItems(); // Re-display the bag items
  displayPrice();
}

function clearBag() {
  localStorage.removeItem("bagItems");
  bagItems = [];
  displayBagCount();
  displayBagItems();
  displayPrice();
}

function getPriceById(id) {
  if (id < coffeeItems.length) {
    const item = coffeeItems[id];
    if (item) {
      return item.price;
    } else {
      console.error(`Coffee item not found for id: ${id}`);
    }
  } else {
    const adjustedId = id - coffeeItems.length;
    if (adjustedId < noncoffeeItems.length) {
      const item = noncoffeeItems[adjustedId];
      if (item) {
        return item.price;
      } else {
        console.error(
          `Non-coffee item not found for adjusted id: ${adjustedId}`
        );
      }
    } else {
      console.error(`ID out of range: ${id}`);
    }
  }
  return 0; // Default price if item not found
}

function displayPrice() {
  let priceBox = document.querySelector(".price");
  let totalMRP = 0;

  // Create a map to store item quantities
  let itemQuantities = {};
  bagItems.forEach((id) => {
    itemQuantities[id] = (itemQuantities[id] || 0) + 1;
  });

  // Calculate total price considering quantities
  for (let id in itemQuantities) {
    const itemPrice = getPriceById(parseInt(id));
    totalMRP += itemPrice * itemQuantities[id];
  }

  const platformFee = 30;
  const totalAmount = totalMRP + platformFee;

  priceBox.innerHTML = `
    <div>
      <span>Total MRP</span>
      <span>₹${totalMRP}</span>
    </div>

    <div>
      <span>Platform Fee</span>
      <span class="highlight">Know More ₹${platformFee}</span>
    </div>

    <hr />
    <div class="total">
      <span>Total Amount</span>
      <span class="total_price">₹${totalAmount}</span>
    </div>

   <button id="google-pay-button" data-index-url="/index">PLACE ORDER</button>
  `;
}
// Function to place the order
function placeOrder() {
  // Recreate the itemQuantities object based on bagItems
  let itemQuantities = {};
  bagItems.forEach((id) => {
    itemQuantities[id] = (itemQuantities[id] || 0) + 1;
  });

  // Collect order details
  const orderDetails = bagItems.map((id) => {
    return {
      id: id,
      name:
        id < coffeeItems.length
          ? coffeeItems[id].item_name
          : noncoffeeItems[id - coffeeItems.length].item_name,
      quantity: itemQuantities[id],
      price: getPriceById(parseInt(id)),
    };
  });

  // Prepare order data to send to server
  const orderData = {
    items: orderDetails,
    status: "Order Received",
  };

  // Send order to server
  fetch("/bag", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Save order ID to localStorage for tracking
      localStorage.setItem("currentOrderId", data.order_id);

      // Optional: Log the order details
      console.log("Order sent successfully:", data);

      // Clear the bag

      // Redirect to index page for order tracking
      window.location.href = "/index";
    })
    .catch((error) => {
      console.error("Error sending order:", error);

      // Optional: Show user-friendly error message
      alert("There was a problem placing your order. Please try again.");
    });
}
// Attach event listener to PLACE ORDER button
document
  .getElementById("google-pay-button")
  .addEventListener("click", placeOrder);
