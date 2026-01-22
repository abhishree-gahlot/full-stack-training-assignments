let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function notifyCartChange() {
  document.dispatchEvent(new Event("cartUpdated"));
}

function getCartQuantity(productId) {
  const item = cart.find(item => item.id === productId);
  return item ? item.quantity : 0;
}

function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  notifyCartChange();
  applySearchAndFilter(); 
}

function increaseQuantity(productId) {
  cart = cart.map(item =>
    item.id === productId
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );

  saveCart();
  notifyCartChange();
  applySearchAndFilter();
}

function decreaseQuantity(productId) {
  const item = cart.find(item => item.id === productId);

  if (!item) return;

  if (item.quantity === 1) {
    cart = cart.filter(item => item.id !== productId);
  } else {
    cart = cart.map(item =>
      item.id === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }

  saveCart();
  notifyCartChange();
  applySearchAndFilter();
}
