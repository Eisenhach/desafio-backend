

   const fs = require('fs')

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
    let data = await this.getProducts();
    return data.length + 1;
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
        codigoRepetido == true
          ? console.log("El codigo esta siendo repetido")
          : data.push({ ...newProduct, id: await this.getId() });
        await fs.promises.writeFile(this.path, JSON.stringify(data, null));
      }
    } catch (err) {
      console.log(err);
    }
  }


  async getProductsById(id){
    const data = await this.getProducts()
    let buscarProducto = data.find(e => e.id == id)
    return buscarProducto === undefined ? console.log("Can't find the ID") : buscarProducto  

  }

  async deleteProduct(id){
    const data = await this.getProducts()
    let i = data.findIndex(e=> e.id === id)
    data.splice(i,1)
    await fs.promises.writeFile(this.path, JSON.stringify(data))
  }


  async updateProducts (id, product){
    let data = await this.getProducts()
    let i = data.findIndex(e=> e.id === id)
    product.id = id;
    data.splice(i,1,product)
    await fs.promises.writeFile(this.path, JSON.stringify(data))
  }

}

const resultadoAsyncrono = async () =>{
    const manager = new productManager()
    console.log(await manager.getProducts())
    await manager.addProduct('Pruebita', 'Productazo', 2500,'no img','aaa',2);
    await manager.getProducts()
    await manager.addProduct('Pruebita', 'Productazo', 2500,'no img','aaa',2)
    console.log(await manager.getProducts())
    
    await manager.getProductsById(2)
    await manager.addProduct("producto prueba 2 ","Este es un producto prueba 23",150,"Sin imagen","abc1231",25)
    await productManager.updateProducts(2,{"title": "producto prueba 25 ","description": "Este es un producto prueba 23","price": 150,"thumbnail": "Sin imagen","code": "abc1231","stock": 25,"id": 5})
    await productManager.deleteProduct(2)
   
};

resultadoAsyncrono()






