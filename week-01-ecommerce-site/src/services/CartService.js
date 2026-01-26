export default class CartService {
  constructor(storageKey = "cart") {
    this.storageKey = storageKey;
    this.cart = JSON.parse(localStorage.getItem(this.storageKey)) || [];
  }

  saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
  }

  notifyCartChange(productId) {
    document.dispatchEvent(
      new CustomEvent("cartUpdated", {
        detail: { productId }
      })
    );
  }

  getCartQuantity(productId) {
    const item = this.cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }

  addToCart(product) {
    if (!product) return;

    const existingItem = this.cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.saveCart();
    this.notifyCartChange(product.id);
  }

  increaseQuantity(productId) {
    const item = this.cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity++;

    this.saveCart();
    this.notifyCartChange(productId);
  }

  decreaseQuantity(productId) {
    const item = this.cart.find(item => item.id === productId);
    if (!item) return;

    if (item.quantity === 1) {
      this.cart = this.cart.filter(item => item.id !== productId);
    } else {
      item.quantity--;
    }

    this.saveCart();
    this.notifyCartChange(productId);
  }

  getItems() {
    return [...this.cart];
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    document.dispatchEvent(new Event("cartUpdated"));
  }
}
