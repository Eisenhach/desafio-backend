const express = require('express');
const app = express();
const ProductManager = require('../productManager');
const productManager = new ProductManager();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.listen(8080, () => console.log('Iniciando servidor en puerto 8080'));

app.get('/products', async (req,res) => {
        const limit = req.query.limit;
        const producto = await productManager.getProducts();

        if (limit){
            return res.send(producto.slice(0, limit));
        }

        res.send(producto)
})

app.get('/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid, 10)
    const producto = await productManager.getProducts();


    const productId = producto.find(({id}) => id === pid);
    if( productId === undefined) {
        return res.status(404).send();
    }

    res.send(productId)

})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});