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

  const groupedProducts = category
    ? { [category]: products }
    : groupByCategory(products);

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

  card.dataset.productId = id;

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

  renderActionButtons(action, product);

  info.append(productName, productPrice, productCategory);
  card.append(img, info, action);

  return card;
}

function renderActionButtons(action, product) {
  const quantity = cartService.getCartQuantity(product.id);
  action.innerHTML = "";

  if (quantity === 0) {
    const addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";
    addButton.className = "add-to-cart-button";
    addButton.addEventListener("click", () =>
      cartService.addToCart(product)
    );
    action.appendChild(addButton);
  } else {
    const wrapper = document.createElement("div");
    wrapper.className = "qty-wrapper";

    const minus = document.createElement("button");
    minus.textContent = "−";
    minus.addEventListener("click", () =>
      cartService.decreaseQuantity(product.id)
    );

    const qty = document.createElement("span");
    qty.textContent = quantity;

    const plus = document.createElement("button");
    plus.textContent = "+";
    plus.addEventListener("click", () =>
      cartService.increaseQuantity(product.id)
    );

    wrapper.append(minus, qty, plus);
    action.appendChild(wrapper);
  }
}

document.addEventListener("cartUpdated", (event) => {
  const { productId } = event.detail || {};
  if (!productId) return;

  updateProductCard(productId);
});

function updateProductCard(productId) {
  const card = document.querySelector(
    `[data-product-id="${productId}"]`
  );
  if (!card) return;

  const action = card.querySelector(".product-action");
  const product =
    currentProducts.find(productItem  => productItem .id === productId) ||
    { id: productId };

  renderActionButtons(action, product);
}

function loadCategories(products) {
  if (!categoryFilter) return;

  categoryFilter.innerHTML = "";
  const categories = ["all", ...new Set(products.map(productItem => productItem .category))];

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function applySearchAndFilter(allProducts) {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filteredProducts = allProducts.filter(product => {
    return (
      product.name.toLowerCase().includes(searchText) &&
      (selectedCategory === "all" ||
        product.category === selectedCategory)
    );
  });

  categorySections = {};
  productContainer.innerHTML = "";
  currentProducts = filteredProducts.slice();

  displayProducts(filteredProducts);
}

function setupSearchFilter(allProducts) {
  searchInput?.addEventListener("input", () =>
    applySearchAndFilter(allProducts)
  );
  categoryFilter?.addEventListener("change", () =>
    applySearchAndFilter(allProducts)
  );
}

function groupByCategory(products) {
  return products.reduce((accumulator, product) => {
    accumulator[product.category] ??= [];
    accumulator[product.category].push(product);
    return accumulator;
  }, {});
}

export { displayProducts, loadCategories, setupSearchFilter, currentProducts };
