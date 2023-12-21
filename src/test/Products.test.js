import chai from "chai";
import { describe } from "mocha";
import supertest from "supertest";
import app from "../app.js";

const expect = chai.expect;
const requester = supertest(app);

describe(" Test para comprobar que renderize los productos en el home", () => {
  it("debe renderizar los productos", async () => {
    const response = await requester.get("http://localhost:8080/products");
    expect(response.status).to.equal(200);
  });
});
