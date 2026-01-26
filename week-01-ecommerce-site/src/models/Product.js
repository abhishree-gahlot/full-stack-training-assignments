export default class Product {
  constructor({ id, name, price, category, stock, image }) {
    this.id = id ? Number(id) : Date.now();
    this.name = name;
    this.price = price;
    this.category = category;
    this.stock = stock;
    this.image = image;
  }

  isOutOfStock() {
    return this.stock <= 0;
  }

  static getDefaultImage(category) {
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
    return defaultImages[category.toLowerCase()] || "/assets/product-img/sample.jpg";
  }
}