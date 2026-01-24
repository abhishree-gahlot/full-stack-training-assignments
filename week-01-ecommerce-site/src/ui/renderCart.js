const cartContainer = document.getElementById("cart-container");
const cartTotal = document.getElementById("cart-total");
const buyNowButton = document.getElementById("buy-now");

function renderCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "Your cart is empty &#128722;";
    cartTotal.textContent = "";
    return;
  }

  let numberOfItems = 0;
  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-row";

    const info = document.createElement("div");
    info.innerHTML = `
      <strong>${++numberOfItems}. ${item.name}</strong><br>
      <span>Price: ₹${item.price}</span><br>
      <span>Quantity: ${item.quantity}</span><br>
      <span>Subtotal : ₹${item.price * item.quantity}</span>
    `;

    const quantityWrapper = document.createElement("div");
    quantityWrapper.className = "quantity-wrapper";

    const minusButton = document.createElement("button");
    minusButton.textContent = "-";

    const quantityText = document.createElement("span");
    quantityText.textContent = item.quantity;

    const addButton = document.createElement("button");
    addButton.textContent = "+";

    minusButton.addEventListener("click" , () => {
      decreaseQuantity(item.id);
      renderCart();
    });

    addButton.addEventListener("click" , () => {
      increaseQuantity(item.id);
      renderCart();
    });

    quantityWrapper.appendChild(minusButton);
    quantityWrapper.appendChild(quantityText);
    quantityWrapper.appendChild(addButton);

    const removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click" , () =>{
      cart = cart.filter(product => product.id !== item.id);
      saveCart();
      renderCart();
    });

    row.appendChild(info);
    row.appendChild(quantityWrapper);
    row.appendChild(removeButton);
    cartContainer.appendChild(row);
  });

  
  const total = cart.reduce((sum, item) => 
  {
    return sum + item.price * item.quantity;
  }, 0);

  cartTotal.textContent = `Total: ₹${total}`;
}

renderCart();

function buyNowMessage() 
{
  if (document.getElementById("popup-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "popup-overlay";
  overlay.classList.add("hidden");

  const popup = document.createElement("div");
  popup.className = "popup";

  const heading = document.createElement("h2");
  heading.innerHTML = "Thank You! &#127881;";

  const message = document.createElement("p");
  message.textContent = "Thanks for shopping with us.";

  const closeButton = document.createElement("button");
  closeButton.id = "close-popup";
  closeButton.textContent = "OK";

  closeButton.addEventListener("click", () => {
    overlay.classList.add("hidden");
    window.location.href = "index.html";
  });

  popup.append(heading, message, closeButton);
  overlay.appendChild(popup);

  document.body.appendChild(overlay);

  overlay.classList.remove("hidden");
}

buyNowButton.addEventListener("click", () => {
  buyNowMessage();

  cart = [];
  saveCart();
  renderCart();
});

document.addEventListener("cartUpdated", renderCart);
