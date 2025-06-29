const CoffeeItems = [
  {
    itemId: 1,
    item_image: "/static/Images/Espresso.jpg",
    alt_image_name: "espresso",
    item_name: "Espresso",
    rating: 5,
    item_info: ` Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reiciendis vel repudiandae, autem aliquam perspiciatis
          provident.`,
    price: 200,
  },
  {
    itemId: 2,
    item_image: "/static/Images/latte.jpg",
    alt_image_name: "espresso",
    item_name: "Latte",
    rating: 4.8,
    item_info: ` Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reiciendis vel repudiandae, autem aliquam perspiciatis
          provident.`,
    price: 190,
  },
  {
    itemId: 3,
    item_image: "/static/Images/Machhiato.jpg",
    alt_image_name: "espresso",
    item_name: "Machhiato",
    rating: 3.5,
    item_info: ` Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reiciendis vel repudiandae, autem aliquam perspiciatis
          provident.`,
    price: 210,
  },
  {
    itemId: 4,
    item_image: "/static/Images/Flat_White.jpg",
    alt_image_name: "espresso",
    item_name: "Flat White",
    rating: 3.8,
    item_info: ` Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reiciendis vel repudiandae, autem aliquam perspiciatis
          provident.`,
    price: 200,
  },
  {
    itemId: 5,
    item_image: "/static/Images/Cappuccino.jpg",
    alt_image_name: "espresso",
    item_name: "Cappuccino",
    rating: 4.6,
    item_info: ` Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reiciendis vel repudiandae, autem aliquam perspiciatis
          provident.`,
    price: 100,
  },
];
const nonCoffeeItems = [
  {
    itemId: 6,
    item_image: "/static/Images/Hot chocolate.jpg",
    alt_image_name: "espresso",
    item_name: "Hot chocolate",
    rating: 5,
    item_info: ` Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reiciendis vel repudiandae, autem aliquam perspiciatis
          provident.`,
    price: 130,
  },
  {
    itemId: 7,
    item_image: "/static/Images/Milkshake.jpg",
    alt_image_name: "espresso",
    item_name: "Milkshake",
    rating: 4.8,
    item_info: ` Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reiciendis vel repudiandae, autem aliquam perspiciatis
          provident.`,
    price: 160,
  },
  {
    itemId: 8,
    item_image: "/static/Images/Smoothie.jpg",
    alt_image_name: "Smoothie",
    item_name: "Smoothie",
    rating: 3.5,
    item_info: ` Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reiciendis vel repudiandae, autem aliquam perspiciatis
          provident.`,
    price: 120,
  },
  {
    itemId: 9,
    item_image: "/static/Images/Lemonade.jpg",
    alt_image_name: "Lemonade",
    item_name: "Lemonade",
    rating: 3.8,
    item_info: ` Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reiciendis vel repudiandae, autem aliquam perspiciatis
          provident.`,
    price: 220,
  },
  {
    itemId: 10,
    item_image: "/static/Images/Vanilla Milkshake.jpg",
    alt_image_name: "Vanilla Milkshake",
    item_name: "Vanilla Milkshake",
    rating: 4.6,
    item_info: ` Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reiciendis vel repudiandae, autem aliquam perspiciatis
          provident.`,
    price: 180,
  },
];

localStorage.setItem("CoffeeItems", JSON.stringify(CoffeeItems));
localStorage.setItem("nonCoffeeItems", JSON.stringify(nonCoffeeItems));
