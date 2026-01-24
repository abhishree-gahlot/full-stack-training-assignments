const loadCartFromStorage = () => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};        

export const saveUserToStorage = (user) => {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
};

export const getUserFromStorage = () => {
  const data = localStorage.getItem("loggedInUser");
  return data ? JSON.parse(data) : null;
};

export const clearUserFromStorage = () => {
  localStorage.removeItem("loggedInUser");
};
