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
      const data = await productModel.findById(id).lean();
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

  async getPaginateProducts({ limit, page, sort, query }) {
    const sortObjetMapper = {
      asc: { price: 1 },
      desc: { price: -1 },
    };

    const modelQuery = query ? JSON.parse(query) : {};
    const modelLimit = limit ? parseInt(limit, 10) : 10;
    const modelPage = page ? parseInt(page, 10) : 1;
    const modelSort = sortObjetMapper[sort] ?? undefined;

    const products = await productModel.paginate(modelQuery, {
      limit: modelLimit,
      page: modelPage,
      sort: modelSort,
    });

    const respuesta = {
      status: "success",
      payload: products.docs,
      totalDocs: products.totalDocs,
      limit: products.limit,
      totalPages: products.totalPages,
      page: products.page,
      pagingCounter: products.pagingCounter,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
    };

    return respuesta;
  }

  async getProductsForView(limit, page, sort, query) {
    const sortObjetMapper = {
      asc: { price: 1 },
      desc: { price: -1 },
    };

    const modelQuery = query ? JSON.parse(query) : {};
    const modelLimit = limit ? parseInt(limit, 10) : 8;
    const modelPage = page ? parseInt(page, 10) : 1;
    const modelSort = sortObjetMapper[sort] ?? undefined;

    const products = await productModel.paginate(modelQuery, {
      limit: modelLimit,
      page: modelPage,
      sort: modelSort,
      lean: true,
    });
    const respuesta = {
      status: "success",
      payload: products.docs,
      totalDocs: products.totalDocs,
      limit: products.limit,
      totalPages: products.totalPages,
      page: products.page,
      pagingCounter: products.pagingCounter,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
    };

    return respuesta;
  }
}

export default productManager;
