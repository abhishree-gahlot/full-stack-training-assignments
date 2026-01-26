import { displayProducts, loadCategories, setupSearchFilter } from "./ui/renderProducts.js";
import { getUserFromStorage } from "./utils/storage.js";
import ProductService from "./services/ProductService.js";

const productService = new ProductService();
let pager;
const PAGE_SIZE = 5;
let allProducts = []; 

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const user = getUserFromStorage();
    if (!user) {
      window.location.href = "./login.html";
      return;
    }

    allProducts = await productService.getProducts();

    pager = productService.productPagerByCategoryRoundRobin(PAGE_SIZE);

    loadNextPage();

    loadCategories(allProducts);

    setupSearchFilter(allProducts);

    setupLoadMoreButton();

  } catch (error) {
    console.error("App initialization failed:", error.message);
    const container = document.getElementById("product-container");
    if (container) container.textContent = "Failed to load products. Please try again later.";
  }
});

function loadNextPage() {
  const next = pager.next();
  if (!next.done) {
    next.value.forEach(batch => displayProducts(batch.products, batch.category));
  } else {
    const loadMoreBtn = document.getElementById("load-more-btn");
    if (loadMoreBtn) loadMoreBtn.disabled = true;
  }
}

function setupLoadMoreButton() {
  const container = document.getElementById("product-container");
  if (!container) return;

  let loadMoreBtn = document.getElementById("load-more-btn");
  if (!loadMoreBtn) {
    loadMoreBtn = document.createElement("button");
    loadMoreBtn.id = "load-more-btn";
    loadMoreBtn.textContent = "Load More";
    loadMoreBtn.style.marginTop = "1rem";
    loadMoreBtn.addEventListener("click", loadNextPage);
    container.parentElement.appendChild(loadMoreBtn);
  }
}

document.addEventListener("cartUpdated", () => {
  displayProducts(allProducts);
});
