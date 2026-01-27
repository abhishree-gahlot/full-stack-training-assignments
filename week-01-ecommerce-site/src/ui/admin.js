import ProductService from "../services/ProductService.js";

const productService = new ProductService();
const form = document.getElementById("add-product-form");
const tableBody = document.querySelector("#product-table tbody");

let allProducts = [];

document.addEventListener("DOMContentLoaded", async () => {
  await loadProducts();
  populateCategoryDropdown();
});

document.getElementById("product-category").addEventListener("change", (event) => {
  const category = event.target.value;
  const productImage = document.getElementById("product-image");

  if (!productImage.value) {
    const defaultImages = {
      bakery: "/assets/product-img/bakery.jpg",
      cleaning: "/assets/product-img/cleaningtools.jpg",
      clothes: "/assets/product-img/clothes.jpg",
      colddrink: "/assets/product-img/colddrink.webp",
      electronics: "/assets/product-img/electronics.jpg",
      footwear: "/assets/product-img/footwear.avif",
      homefurnishing: "/assets/product-img/homefurnishing.jpg",
      kitchen: "/assets/product-img/kitchen.jpg",
      library: "/assets/product-img/library.jpg",
      personalcare: "/assets/product-img/personalcare.jpg",
      petstore: "/assets/product-img/petstore.jpg",
      pharmacy: "/assets/product-img/pharmacy.jpg",
      toystore: "/assets/product-img/toystore.jpg",
      vegetables: "/assets/product-img/vegetables.jpg",
      logo: "/assets/product-img/logo.png",
      sample: "/assets/product-img/sample.jpg",
    };
    productImage.value = defaultImages[category.toLowerCase()] || "/assets/product-img/sample.jpg";
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("product-name").value.trim();
  const price = parseFloat(document.getElementById("product-price").value);
  const category = document.getElementById("product-category").value.trim();
  const image = document.getElementById("product-image").value.trim();
  const stock = parseInt(document.getElementById("product-stock").value) || 0;

  const editingId = form.dataset.editingId;

  try {
    if (!name || !category) {
      showMessage("error", "Name and category are required!");
      return;
    }
    if (isNaN(price) || price < 0) {
      showMessage("error", "Price cannot be negative!");
      return;
    }
    if (stock < 0) {
      showMessage("error", "Stock cannot be negative!");
      return;
    }

    if (editingId) {
      await productService.updateProduct({ id: parseInt(editingId), name, price, category, image, stock });
      showMessage("success", "Product updated successfully!");
      delete form.dataset.editingId;
    } else {
      await productService.addProduct({ name, price, category, image, stock });
      showMessage("success", "Product added successfully!");
    }

    form.reset();
    await loadProducts();
  } catch (error) {
    showMessage("error", "Something went wrong!");
    console.error(error);
  }
});

async function loadProducts() {
  allProducts = await productService.getProducts();
  renderTable();
}

function renderTable() {
  tableBody.innerHTML = "";

  allProducts.forEach((productItem, item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item + 1}</td>
      <td>
        <img src="${productItem.image}" alt="${productItem.name}" width="50" class="me-2 rounded">
        ${productItem.name}
      </td>
      <td>₹${productItem.price.toFixed(2)}</td>
      <td>${productItem.category}</td>
      <td>${productItem.stock}</td>
      <td>
        <button class="btn btn-sm btn-warning edit-btn" data-id="${productItem.id}">Edit</button>
        <button class="btn btn-sm btn-danger delete-btn" data-id="${productItem.id}">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

    tableBody.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", async (event) => {
        const id = Number(event.target.dataset.id); 
        if (confirm("Are you sure you want to delete this product?")) {
        const deleted = productService.deleteProduct(id);
        if (deleted) {
            showMessage("success", "Product deleted successfully!");
            await loadProducts();
        } else {
            showMessage("error", "Failed to delete product!");
        }
        }
    });
    });


  tableBody.querySelectorAll(".edit-btn").forEach(button => {
    button.addEventListener("click", (event) => {
      const id = parseInt(event.target.dataset.id);
      const product = allProducts.find(productItem => productItem.id === id);

      document.getElementById("product-name").value = product.name;
      document.getElementById("product-price").value = product.price;
      document.getElementById("product-category").value = product.category;
      document.getElementById("product-image").value = product.image;
      document.getElementById("product-stock").value = product.stock;

      form.dataset.editingId = id;
    });
  });
}

function showMessage(type, text) {
  const messsageDiv = document.getElementById("form-message");
  messsageDiv.textContent = text;
  messsageDiv.className = ""; 
  messsageDiv.classList.add(type);
  setTimeout(() => { messsageDiv.textContent = ""; messsageDiv.className = ""; }, 3000);
}

function populateCategoryDropdown() {
  const categorySelect = document.getElementById("product-category");
  const categories = [
    "bakery","cleaning","clothes","colddrink","electronics","footwear",
    "homefurnishing","kitchen","library","personalcare","petstore",
    "pharmacy","toystore","vegetables"
  ];

  const existingOptions = Array.from(categorySelect.options).map(option => option.value);

  categories.forEach(category => {
    if (!existingOptions.includes(category)) {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      categorySelect.appendChild(option);
    }
  });
}

