const cartContainer = document.getElementById("cart-container");
const cartTotal = document.getElementById("cart-total");

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

document.addEventListener("cartUpdated", renderCart);

