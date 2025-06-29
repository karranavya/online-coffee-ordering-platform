function onLoad() {
  let bagItemsStr = localStorage.getItem("bagItems");
  bagItems = JSON.parse(bagItemsStr) || [];
  displayItemsOnMenuPage();
  displayBagCount();
}

function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));

  // Add animation effect when adding to bag
  const bagIcon = document.querySelector("#addBag");
  bagIcon.style.transform = "scale(1.2)";
  setTimeout(() => {
    bagIcon.style.transform = "scale(1)";
  }, 200);

  displayBagCount();
}

function displayBagCount() {
  let bagItemCountElement = document.querySelector("#noOfItems");
  if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = "visible";
    bagItemCountElement.innerText = bagItems.length;

    // Add pop animation
    bagItemCountElement.style.animation = "pop 0.3s ease";
    setTimeout(() => {
      bagItemCountElement.style.animation = "";
    }, 300);
  } else {
    bagItemCountElement.style.visibility = "hidden";
  }
}

function displayItemsOnMenuPage() {
  let coffeeContainerElement = document.querySelector(".coffee");
  let noncoffeeContainerElement = document.querySelector(".non_coffee");

  let noncoffeeInnerHtml = ``;
  let coffeeInnerHtml = ``;

  CoffeeItems.forEach((item) => {
    coffeeInnerHtml += `
      <div class="item-container">
        <img src="${item.item_image}" alt="${item.alt_image_name}" loading="lazy" />
        <div class="item-details">
          <div class="item-name"><h1>${item.item_name}</h1></div>
          <div class="rating">⭐ ${item.rating}</div>
          <div class="item-info">
            <p>${item.item_info}</p>
          </div>
          <div class="price">$${item.price}</div>
          <div class="order">
            <button onclick="addToBag(${item.itemId})">Add to Bag</button>
          </div>
        </div>
      </div>
    `;
  });

  nonCoffeeItems.forEach((item) => {
    noncoffeeInnerHtml += `
      <div class="item-container">
        <img src="${item.item_image}" alt="${item.alt_image_name}" loading="lazy" />
        <div class="item-details">
          <div class="item-name"><h1>${item.item_name}</h1></div>
          <div class="rating">⭐ ${item.rating}</div>
          <div class="item-info">
            <p>${item.item_info}</p>
          </div>
          <div class="price">$${item.price}</div>
          <div class="order">
            <button onclick="addToBag(${item.itemId})">Add to Bag</button>
          </div>
        </div>
      </div>
    `;
  });

  coffeeContainerElement.innerHTML = coffeeInnerHtml;
  noncoffeeContainerElement.innerHTML = noncoffeeInnerHtml;
  displayBagCount();
}

// Initialize on page load
onLoad();
