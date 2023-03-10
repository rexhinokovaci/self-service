const coffees = [  {    name: "Americano",    price: 2.5,    description: "Espresso shots topped with hot water.",    img: "americano.jpg",    id: "americano"  },  {    name: "Cappuccino",    price: 3.5,    description: "Espresso topped with a layer of velvety steamed milk and a layer of frothy milk foam.",    img: "cappuccino.jpg",    id: "cappuccino"  },  {    name: "Latte",    price: 4,    description: "Espresso topped with steamed milk and a small layer of milk foam.",    img: "latte.jpg",    id: "latte"  },  {    name: "Mocha",    price: 4.5,    description: "Espresso mixed with chocolate syrup and topped with steamed milk and a small layer of milk foam.",    img: "mocha.jpg",    id: "mocha"  }];

const container = document.querySelector(".container");

coffees.forEach(coffee => {
  const div = document.createElement("div");
  div.classList.add("coffee");

  const img = document.createElement("img");
  img.src = coffee.img;
  img.alt = coffee.name;
  div.appendChild(img);

  const h2 = document.createElement("h2");
  h2.textContent = coffee.name;
  div.appendChild(h2);

  const p1 = document.createElement("p");
  p1.classList.add("description");
  p1.textContent = coffee.description;
  div.appendChild(p1);

  const p2 = document.createElement("p");
  p2.classList.add("price");
  p2.textContent = "$" + coffee.price.toFixed(2);
  div.appendChild(p2);

  const button = document.createElement("button");
  button.textContent = "Add to Cart";
  button.dataset.id = coffee.id;
  div.appendChild(button);

  container.appendChild(div);
});

const cart = [];

const addToCartButtons = document.querySelectorAll(".coffee button");

addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const coffeeId = button.dataset.id;
    const coffeeToAdd = coffees.find(coffee => coffee.id === coffeeId);

    cart.push(coffeeToAdd);

    updateCart();
  });
});

const cartContainer = document.querySelector(".cart");

function updateCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    const p = document.createElement("p");
    p.textContent = "Your cart is empty.";
    cartContainer.appendChild(p);
  } else {
    const ul = document.createElement("ul");

    cart.forEach(coffee => {
      const li = document.createElement("li");
      li.textContent = coffee.name;
      ul.appendChild(li);
    });

    cartContainer.appendChild(ul);
  }
}
