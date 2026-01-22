document.addEventListener("DOMContentLoaded", () => {
  displayProducts(products);
});

document.addEventListener("cartUpdated", () => {
  displayProducts(products);
});
