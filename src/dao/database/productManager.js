import { productModel } from "../models/product.model.js";

class productManager {
  async getProducts() {
    const products = await productModel.find().lean();
    return products;
  }

  async addProduct(product) {
    try {
      const newProduct = await productModel.create(product);
      console.log("Producto agregado a la base de datos");
    } catch (error) {
      console.error("Error al guardar en la base de datos", error);
    }
  }

  async getProductsById(id) {
    try {
      const data = await productModel.findById({ _id: id }).lean();
      return data;
    } catch (error) {
      console.error("Error al buscar por ese ID", error);
    }
  }

  async deleteProduct(id) {
    try {
      const data = await productModel.deleteOne({ _id: id });

      if (data.deletedCount > 0) {
        return "Eliminado con éxito";
      } else {
        return "No se encontró ningún producto con el ID especificado";
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }

  async updateProduct(id, product) {
    try {
      const data = await productModel.updateOne({ _id: id }, product);

      if (data.nModified > 0) {
        return "Producto actualizado con éxito";
      } else {
        return "No se realizó ninguna actualización";
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      throw new Error("Error al actualizar el producto");
    }
  }
}

export default productManager;
