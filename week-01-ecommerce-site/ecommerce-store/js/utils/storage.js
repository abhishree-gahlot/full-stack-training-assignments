const loadCartFromStorage = () => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
