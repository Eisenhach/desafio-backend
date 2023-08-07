class productManager{
    static id = 0;
    nombre;
    products;

    constructor(nombre){
        this.nombre = nombre;
        this.products = [];
    }
    
    construir(title, description, price, thumbrail, code, stock){
        const producto ={
            code: productManager.id,
            title,
            description,
            price,
            thumbrail,
            stock,
        }
    
        this.products.push(producto)
        productManager.id++;
        return producto;

    }


        getProducts(){
            return this.products
        }


        getProductById(productCode) {
            const product = this.products.find(product => product.code === productCode);
            if (product) {
                return product;
            } else {
                console.log('Product not found');
                return null;
            }
        }

}
  
const manager = new productManager('Manager');
const productItem = manager.construir('Antorcha de minecraft', 'Muy luminosa', 50,'not image found', 25 )
const productItem2 = manager.construir('Espada de diamante', 'Encantada', 500,'not image found', 10 )
 console.log(manager.getProducts())     
 

 // :)