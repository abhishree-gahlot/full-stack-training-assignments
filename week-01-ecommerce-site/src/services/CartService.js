export default class CartService {
  constructor(storageKey = "cart") {
    this.storageKey = storageKey;
    this.cart = JSON.parse(localStorage.getItem(this.storageKey)) || [];
  }

  saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
  }

  notifyCartChange() {
    document.dispatchEvent(new Event("cartUpdated"));
  }

  getCartQuantity(productId) {
    const item = this.cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }

  addToCart(product) {
    const existingItem = this.cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.saveCart();
    this.notifyCartChange();
  }

  increaseQuantity(productId) {
    this.cart = this.cart.map(item =>
      item.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    this.saveCart();
    this.notifyCartChange();
  }

  decreaseQuantity(productId) {
    const item = this.cart.find(item => item.id === productId);
    if (!item) return;

    if (item.quantity === 1) {
      this.cart = this.cart.filter(item => item.id !== productId);
    } else {
      this.cart = this.cart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }

    this.saveCart();
    this.notifyCartChange();
  }

  getItems() {
    return [...this.cart];
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.notifyCartChange();
  }
}
