import { faker } from "@faker-js/faker";

faker.location = "es";

export const generateProduct = () => {
  let products = [];
  //itera hasta 100 productos.
  for (let i = 0; i < 50; i++) {
    products.push(productMocks());
  }
  return products;
};

export const productMocks = () => {
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    id: faker.database.mongodbObjectId(),
  };
};
