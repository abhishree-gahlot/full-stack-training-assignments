import CartService from "../services/CartService.js";

const cartService = new CartService();

const cartContainer = document.getElementById("cart-container");
const cartTotal = document.getElementById("cart-total");
const buyNowButton = document.getElementById("buy-now");

function renderCart() {
  const cartItems = cartService.getItems();
  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "Your cart is empty &#128722;";
    cartTotal.textContent = "";
    return;
  }

  let index = 1;
  let total = 0;

  cartItems.forEach(item => {
    total += item.price * item.quantity;

    const row = document.createElement("div");
    row.className = "cart-row";

    const info = document.createElement("div");
    info.innerHTML = `
      <strong>${index++}. ${item.name}</strong><br>
      <span>Price: ₹${item.price}</span><br>
      <span>Quantity: ${item.quantity}</span><br>
      <span>Subtotal: ₹${item.price * item.quantity}</span>
    `;

    const controls = document.createElement("div");
    controls.className = "quantity-wrapper";

    const minus = document.createElement("button");
    minus.textContent = "−";
    minus.addEventListener("click", () =>
      cartService.decreaseQuantity(item.id)
    );

    const qty = document.createElement("span");
    qty.textContent = item.quantity;

    const plus = document.createElement("button");
    plus.textContent = "+";
    plus.addEventListener("click", () =>
      cartService.increaseQuantity(item.id)
    );

    controls.append(minus, qty, plus);

    const remove = document.createElement("button");
    remove.className = "remove-button";
    remove.textContent = "Remove";
    remove.addEventListener("click", () =>
      cartService.decreaseQuantity(item.id)
    );

    row.append(info, controls, remove);
    cartContainer.appendChild(row);
  });

  cartTotal.textContent = `Total: ₹${total}`;
}

buyNowButton.addEventListener("click", () => {
  try {
    const items = cartService.getItems();

    if (items.length === 0) {
      throw new Error("Cart is empty. Add items before checkout.");
    }

    buyNowButton.disabled = true;
    buyNowButton.textContent = "Processing...";

    setTimeout(() => {
      showThankYouPopup();
      cartService.clearCart();

      buyNowButton.disabled = false;
      buyNowButton.textContent = "Buy Now";
    }, 1500);

  } catch (error) {
    alert(error.message);
  }
});


function showThankYouPopup() {
  if (document.getElementById("popup-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "popup-overlay";

  const popup = document.createElement("div");
  popup.className = "popup";

  popup.innerHTML = `
    <h2>Thank You &#127881;</h2>
    <p>Thanks for shopping with us.</p>
    <button id="close-popup">OK</button>
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  document.getElementById("close-popup").addEventListener("click", () => {
    overlay.remove();
    window.location.href = "index.html";
  });
}


document.addEventListener("cartUpdated", renderCart);

renderCart();
