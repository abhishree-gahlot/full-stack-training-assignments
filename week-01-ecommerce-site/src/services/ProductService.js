import Product from "../models/Product.js";

export default class ProductService {
  constructor() {
    this.products = [];
    this.storageKey = "joyblue-products";
  }

  async getProducts() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      this.products = JSON.parse(stored).map(p => new Product(p));
      return this.products;
    }

    const response = await fetch("./data/products.json");
    if (!response.ok) throw new Error("Failed to load products.json");
    const rawProducts = await response.json();
    this.products = rawProducts.map(p => new Product(p));
    this._saveToLocalStorage();
    return this.products;
  }

  getProductById(id) {
    return this.products.find(p => p.id === id);
  }

  getCategories() {
    return [...new Set(this.products.map(p => p.category))];
  }

  addProduct(product) {
    const newProduct = new Product(product);
    this.products.push(newProduct);
    this._saveToLocalStorage();
    return newProduct;
  }

   updateProduct(updated) {
    const index = this.products.findIndex(p => p.id === updated.id);
    if (index === -1) return null;

    const existing = this.products[index];

    existing.name = updated.name;
    existing.price = updated.price;
    existing.category = updated.category.trim().toLowerCase();
    existing.image = updated.image;
    existing.stock = updated.stock;

    this._save();
    return existing;
  }


    deleteProduct(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
        const deleted = this.products.splice(index, 1)[0];
        this._saveToLocalStorage(); 
        return deleted;
    }
    return null;
    }

  *productPagerByCategoryRoundRobin(pageSize = 5) {
    const categories = this.getCategories();
    const categoryIndexes = {}; 
    categories.forEach(cat => categoryIndexes[cat] = 0);

    let moreProducts = true;
    while (moreProducts) {
      moreProducts = false;
      const pageBatch = [];

      for (const category of categories) {
        const productsInCategory = this.products.filter(p => p.category === category);
        const start = categoryIndexes[category];
        const end = start + pageSize;

        if (start < productsInCategory.length) {
          pageBatch.push({ category, products: productsInCategory.slice(start, end) });
          categoryIndexes[category] += pageSize;
          moreProducts = true;
        }
      }

      if (pageBatch.length) yield pageBatch;
    }
  }

  _saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.products));
  }
}
