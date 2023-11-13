import { ProductRepository } from "../../repository/product.repository.js";
import { productModel } from "../models/product.model.js";

const productRepository = new ProductRepository();

class productManager {
  async getProducts() {
    const products = await productRepository.get();
    return products;
  }

  async addProduct(product) {
    try {
      const newProduct = await productRepository.add(product);
      console.log("Producto agregado a la base de datos");
    } catch (error) {
      console.error("Error al guardar en la base de datos", error);
    }
  }

  async getProductsById(id) {
    try {
      const data = await productRepository.getById(id);
      return data;
    } catch (error) {
      console.error("Error al buscar por ese ID", error);
    }
  }

  async deleteProduct(id) {
    try {
      const data = await productRepository.delete(id);

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
      const data = await productRepository.update(id, product);

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

  async getPaginateProducts({ limit, page, sort, query }) {
    return await productRepository.getPaginate(limit, page, sort, query);
  }

  async getProductsForView(limit, page, sort, query) {
    return await productRepository.getPaginate(limit, page, sort, query);
  }
}

export default productManager;
