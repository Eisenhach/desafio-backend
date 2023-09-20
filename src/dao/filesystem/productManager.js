import fs from "fs";

class productManager {
  static id = 0;

  products;

  constructor() {
    this.products = [];
    this.path = "./products.json";
  }

  async getProducts() {
    const data = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    return data;
  }

  async getId() {
    try {
      const data = await this.getProducts();
      const lastProduct = data[data.length - 1];
      const newId = lastProduct ? lastProduct.id + 1 : 1;
      return newId;
    } catch (err) {
      console.error("Error al leer el archivo de productos", err);
    }
  }

  catch(err) {
    console.error("Error al leer el archivo de productos", err);
    return [];
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    try {
      if (!fs.existsSync(this.path)) {
        const emptyList = [];
        emptyList.push({ ...newProduct, id: await this.getId() });

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(emptyList, null, "\t")
        );
      } else {
        const data = await this.getProducts();
        const codigoRepetido = data.some((e) => e.code === newProduct.code);
        if (codigoRepetido) {
          console.log("El código está siendo repetido");
        } else {
          data.push({ ...newProduct, id: await this.getId() });
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(data, null, "\t")
          );
        }
      }
    } catch (err) {
      console.error("Error al agregar un producto:", err);
    }
  }

  async getProductsById(id) {
    const data = await this.getProducts();
    let buscarProducto = data.find((e) => e.id == id);
    return buscarProducto === undefined
      ? console.log("Can't find the ID")
      : buscarProducto;
  }

  async deleteProduct(id) {
    const data = await this.getProducts();
    let i = data.findIndex((e) => e.id === id);
    if (i !== -1) {
      data.splice(i, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(data, null, "\t"));
    } else {
      console.log("Producto no encontrado");
    }
  }
  async updateProduct(id, product) {
    let data = await this.getProducts();
    let i = data.findIndex((e) => e.id === id);
    if (i !== -1) {
      product.id = id;
      data.splice(i, 1, product);
      await fs.promises.writeFile(this.path, JSON.stringify(data, null, "\t"));
    } else {
      console.log("Producto no encontrado");
    }
  }
}

const resultadoAsyncrono = async () => {
  const manager = new productManager();
};

resultadoAsyncrono();

export default productManager;
