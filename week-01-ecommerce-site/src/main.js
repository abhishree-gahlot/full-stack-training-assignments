import { displayProducts } from "./ui/renderProducts.js";
import { getCurrentUser } from "./utils/storage.js";

let products = [];

async function loadProducts() {
  const response = await fetch("../public/data/products.json");

  if (!response.ok) {
    throw new Error("Failed to load products");
  }

  return response.json();
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const user = getCurrentUser();

    if (!user) {
      window.location.href = "../public/login.html";
      return;
    }

    products = await loadProducts();
    displayProducts(products);

  } catch (error) {
    console.error("App initialization failed:", error.message);
  }
});

document.addEventListener("cartUpdated", () => {
  displayProducts(products);
});
