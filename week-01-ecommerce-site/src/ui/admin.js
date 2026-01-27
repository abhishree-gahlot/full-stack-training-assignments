import ProductService from "../services/ProductService.js";

const productService = new ProductService();
const form = document.getElementById("add-product-form");
const tableBody = document.querySelector("#product-table tbody");

let allProducts = [];

document.addEventListener("DOMContentLoaded", async () => {
  await loadProducts();
  populateCategoryDropdown();
});

document.getElementById("product-category").addEventListener("change", (e) => {
  const category = e.target.value;
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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

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
  } catch (err) {
    showMessage("error", "Something went wrong!");
    console.error(err);
  }
});

async function loadProducts() {
  allProducts = await productService.getProducts();
  renderTable();
}

function renderTable() {
  tableBody.innerHTML = "";

  allProducts.forEach((p, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>
        <img src="${p.image}" alt="${p.name}" width="50" class="me-2 rounded">
        ${p.name}
      </td>
      <td>₹${p.price.toFixed(2)}</td>
      <td>${p.category}</td>
      <td>${p.stock}</td>
      <td>
        <button class="btn btn-sm btn-warning edit-btn" data-id="${p.id}">Edit</button>
        <button class="btn btn-sm btn-danger delete-btn" data-id="${p.id}">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

    tableBody.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
        const id = Number(e.target.dataset.id); 
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


  tableBody.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      const product = allProducts.find(p => p.id === id);

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
  const msgDiv = document.getElementById("form-message");
  msgDiv.textContent = text;
  msgDiv.className = ""; 
  msgDiv.classList.add(type);
  setTimeout(() => { msgDiv.textContent = ""; msgDiv.className = ""; }, 3000);
}

function populateCategoryDropdown() {
  const categorySelect = document.getElementById("product-category");
  const categories = [
    "bakery","cleaning","clothes","colddrink","electronics","footwear",
    "homefurnishing","kitchen","library","personalcare","petstore",
    "pharmacy","toystore","vegetables"
  ];

  const existingOptions = Array.from(categorySelect.options).map(opt => opt.value);

  categories.forEach(cat => {
    if (!existingOptions.includes(cat)) {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      categorySelect.appendChild(option);
    }
  });
}

