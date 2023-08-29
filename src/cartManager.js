import fs from "fs";

class CartManager {
  constructor(file) {
    this.cart = file || "./cart.json";
  }

  async getCarts() {
    const data = JSON.parse(await fs.promises.readFile(this.cart, "utf-8"));
    return data;
  }

  async getId() {
    const data = await this.getCarts();
    return data.length + 1;
  }

  async addCart(newCart) {
    newCart.id = await this.getId();
    let data = await this.getCarts();
    data.push(newCart);
    await fs.promises.writeFile(this.cart, JSON.stringify(data));
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    const cartFind = carts.find((cart) => cart.id == id);
    return cartFind;
  }

  async addProductsToCart(cid, pid, product) {
    try {
      const carts = await this.getCarts();
      const selectedCart = carts[cid - 1];

      if (selectedCart) {
        const cartProducts = selectedCart.products || [];
        const existeProduct = cartProducts.find((prod) => prod.id === pid);

        if (existeProduct) {
          existeProduct.quantity++;
        } else {
          cartProducts.push({ ...product, id: pid, quantity: 1 });
        }

        await fs.promises.writeFile(this.cart, JSON.stringify(carts));
      } else {
        console.log("Carts not found");
      }
    } catch (error) {
      console.error("Error al añadir el producto al carrito", error);
    }
  }
}

export default CartManager;
