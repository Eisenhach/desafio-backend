import { faker } from "@faker-js/faker";

faker.location = "es";

export const generateProduct = () => {
  let products = [];
  //itera hasta 100 productos.
  for (let i = 0; i < 2; i++) {
    products.push(productMocks);
  }
  return;
};

export const productMocks = () => {
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    stock: faker.commerce.stock(),
    id: faker.database.mongodbObjectId(),
  };
};
