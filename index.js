const express = require('express');

const app = express();

app.use(express.json());

app.post('/calculate-total', (req, res)=>{
    const products = req.body;
    if(!Array.isArray(products)){
        return res.status(400).json("Invalid Input. Array is not provided");
    }

    let total = 0;

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        if (typeof product.price !== 'number' || product.price <= 0 || typeof product.quantity !== 'number' || product.quantity < 1) {
            return res.status(400).json(`Invalid price or quantity for product: ${product.name}`);
        }

        total += (product.price) * (product.quantity);
    }

    res.status(200).json(total);

});

const port = 3000;

app.listen(port, ()=>{
    console.log('Server is running');
})