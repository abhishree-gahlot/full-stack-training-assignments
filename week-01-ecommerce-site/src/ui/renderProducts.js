import CartService from "../services/CartService.js";

const cartService = new CartService();
const productContainer = document.getElementById("product-container");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");

let categorySections = {}; 
let currentProducts = [];  

function displayProducts(products, category = null) {
  if (!products || products.length === 0) {
    if (!category) productContainer.textContent = "No products found!";
    return;
  }

  const groupedProducts = category ? { [category]: products } : groupByCategory(products);

  for (const cat in groupedProducts) {
    renderCategorySection(cat, groupedProducts[cat]);
  }
}

function renderCategorySection(category, products) {
  let section = categorySections[category];

  if (!section) {
    section = document.createElement("section");
    section.className = "category-section";

    const heading = document.createElement("h2");
    heading.textContent = category;
    heading.style.margin = "20px 0";
    heading.style.color = "#2b79cc";

    const productList = document.createElement("div");
    productList.className = "product-list";

    section.appendChild(heading);
    section.appendChild(productList);
    productContainer.appendChild(section);

    categorySections[category] = section;
  }

  const productList = section.querySelector(".product-list");
  products.forEach(product => {
    const card = createProductCard(product);
    productList.appendChild(card);
  });
}
function createProductCard(product) {
  const { id, name, price, category, image } = product;

  const card = document.createElement("div");
  card.className = "product-card";

  const img = document.createElement("img");
  img.src = image;
  img.alt = name;
  img.className = "product-img";

  const info = document.createElement("div");
  info.className = "product-info";

  const productName = document.createElement("h4");
  productName.textContent = name;

  const productPrice = document.createElement("p");
  productPrice.textContent = `₹${price}`;

  const productCategory = document.createElement("span");
  productCategory.textContent = category;

  const action = document.createElement("div");
  action.className = "product-action";

  const quantity = cartService.getCartQuantity(id);

  if (quantity === 0) {
    const addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";
    addButton.className = "add-to-cart-button";
    addButton.addEventListener("click", () => cartService.addToCart(product));
    action.appendChild(addButton);
  } else {
    const quantityWrapper = document.createElement("div");
    quantityWrapper.className = "qty-wrapper";

    const minusButton = document.createElement("button");
    minusButton.textContent = "−";
    minusButton.addEventListener("click", () => cartService.decreaseQuantity(id));

    const quantityText = document.createElement("span");
    quantityText.textContent = quantity;

    const addButton = document.createElement("button");
    addButton.textContent = "+";
    addButton.addEventListener("click", () => cartService.increaseQuantity(id));

    quantityWrapper.appendChild(minusButton);
    quantityWrapper.appendChild(quantityText);
    quantityWrapper.appendChild(addButton);

    action.appendChild(quantityWrapper);
  }

  info.appendChild(productName);
  info.appendChild(productPrice);
  info.appendChild(productCategory);

  card.appendChild(img);
  card.appendChild(info);
  card.appendChild(action);

  return card;
}

function loadCategories(products) {
  if (!categoryFilter) return;

  categoryFilter.innerHTML = "";
  const categories = ["all", ...new Set(products.map(p => p.category))];

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function applySearchAndFilter(allProducts) {
  if (!allProducts || allProducts.length === 0) return;

  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchText);
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  categorySections = {};
  productContainer.innerHTML = "";
  currentProducts = filteredProducts.slice();

  displayProducts(filteredProducts);
}

function setupSearchFilter(allProducts) {
  if (searchInput) {
    searchInput.addEventListener("input", () => applySearchAndFilter(allProducts));
  }
  if (categoryFilter) {
    categoryFilter.addEventListener("change", () => applySearchAndFilter(allProducts));
  }
}

function groupByCategory(products) {
  return products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});
}

export { displayProducts, loadCategories, setupSearchFilter, currentProducts };
