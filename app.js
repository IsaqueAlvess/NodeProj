const express = require("express"); //Importing the express module 
const {randomUUID} = require("crypto");
const fs = require("fs");

const app = express();

app.use(express.json());

let products = [];

fs.readFile("products.json","utf-8", (err, data)=> {
    if(err) {
        console.log(err);        
    }else{
        products = JSON.parse(data);
    }
});

// REST Methods
/** POST => Inserir um dado
    GET => Buscar um/mais dados
    PUT => Alterar um/mais dados
    DELETE => Remover um dado (Hard Delete)
 */

/**
 * Body => sempre que quiser enviar dados para minha app
 * Params => Route parameters ex: /product/123
 * Query => /product?id=123&value=123456
 */

    app.get('/products', (request, response) => {
        return response.json(products);
    });

    app.get('/products/:id', (request, response) => {
        const {id} = request.params;

        const product = products.find(product => product.id === id);
        return response.json(product);
    });

    app.post("/products", (request, response) => {
        //Nome e preço => name e price

        const {name, price} = request.body;
        const product = {
            name, 
            price,
            id: randomUUID(),
        };
        products.push(product);

        productFile();

        return response.status(200).json({message: "Produto inserido com sucesso!"});
    }); 

    app.put('/products/:id', (request, response) => {

        const {id} = request.params;
        const {name, price} = request.body;

        const productIndex = products.findIndex(product => product.id === id);
        if (productIndex < 0) {
            return response.status(400).json({error: 'Product not found'});
        }

        products[productIndex] = {
            ...products[productIndex],
            name,
            price,
        };

        productFile();

        return response.status(200).json({message:"Produto alterado com sucesso!"});

    });

    app.delete('/products/:id', (request, response) => {
        const {id} = request.params;
        const productIndex = products.findIndex(product => product.id === id);

        products.splice(productIndex,1);
        
        productFile();

        return response.status(200).json({message: "Produto deletado com sucesso!"});
    });

    function productFile(){
        fs.writeFile("products.json", JSON.stringify(products), (err) => {
            if(err){
                console.log(err);
            }else{
                console.log("Produto salvo com sucesso!");
            }
        });
    }


app.listen(4002, () => console.log("Servidor está rodando na porta 4002!"));

