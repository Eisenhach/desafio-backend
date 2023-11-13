import { productModel } from "../dao/models/product.model.js";

export class ProductRepository {
  async get() {
    return await productModel.find().lean();
  }

  async add(product) {
    return await productModel.create(product);
  }

  async getById(id) {
    return await productModel.findById(id).lean();
  }

  async delete(id) {
    return await productModel.deleteOne({ _id: id });
  }

  async update(id, product) {
    return await productModel.updateOne({ _id: id }, product);
  }

  async getPaginate(limit, page, sort, query) {
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
